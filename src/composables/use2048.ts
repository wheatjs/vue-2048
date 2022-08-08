import { createRandom, deepClone, isArrayEqual, rotateMatrix } from '~/utils'

let id = 0
const createId = () => id += 1
const WINNING_SCORE = 2048

export type BoardTile = [number, number] | null
export type Board = BoardTile[][]
export type Direction = 'up' | 'down' | 'left' | 'right'

export interface Use2048Options {
  seed?: number
}

export const directionToRotation = (direction: Direction) => {
  switch (direction) {
    case 'up':
      return 0
    case 'down':
      return 2
    case 'left':
      return 1
    case 'right':
      return 3
  }
}

export function use2048() {
  const seed = ref(Math.random())
  const onMoveHook = createEventHook<Direction>()
  const onDidWinHook = createEventHook<void>()

  let rand = createRandom(seed.value)

  const score = ref(0)
  const rows = ref(4)
  const columns = ref(4)
  const board = ref<Board>(Array.from({ length: rows.value }).map(() => Array.from({ length: columns.value }).map(() => null)))
  const hasWon = ref(false)
  const isGameOver = ref(false)

  watch(hasWon, () => {
    if (hasWon.value === true)
      onDidWinHook.trigger()
  })

  const checkIsGameOver = (board: Board) => {
    for (let i = 0; i < board.length; i++) {
      for (let x = 0; x < board[i].length; x++) {
        if (board[i][x] === null)
          return false
      }
    }

    for (let i = 0; i < board.length; i++) {
      for (let x = 0; x < board[i].length; x++) {
        if (i + 1 < board.length) {
          const current = board[i][x]
          const next = board[i + 1][x]

          if (current![0] === next![0])
            return false
        }

        if (x + 1 < board[i].length) {
          const current = board[i][x]
          const next = board[i][x + 1]

          if (current![0] === next![0])
            return false
        }
      }
    }

    return true
  }

  const setRandomTile = (_board: Board) => {
    const value = rand() < 0.9 ? 2 : 4
    const row = rand(0, rows.value - 1)
    const column = rand(0, columns.value - 1)

    if (_board[row][column] !== null)
      setRandomTile(_board)
    else
      _board[row][column] = [value, createId()]

    if (checkIsGameOver(_board)) {
      isGameOver.value = true
      return _board
    }

    return _board
  }

  const init = (_seed?: number) => {
    score.value = 0
    isGameOver.value = false
    hasWon.value = false

    if (_seed) {
      seed.value = _seed
      rand = createRandom(_seed)
    }

    let _board: Board = Array.from({ length: rows.value }).map(() => Array.from({ length: columns.value }).map(() => null))
    _board = setRandomTile(_board)
    _board = setRandomTile(_board)
    board.value = _board
  }

  const move = (direction: Direction) => {
    let _board = deepClone(board.value)

    const [startRow, endRow, rowStep] = direction === 'down'
      ? [0, rows.value, 1]
      : [0, rows.value, 1]
    const [startColumn, endColumn, columnStep] = direction === 'right' ? [columns.value - 1, -1, -1] : [0, columns.value, 1]

    const rotations = directionToRotation(direction)
    _board = rotateMatrix(_board, rotations)

    // An array to keep track of merged tiles. Since tiles can only be merged once per round, we can use this to prevent merging the same tile twice.
    const merges: number[] = []

    for (let row = startRow; row !== endRow; row += rowStep) {
      for (let col = startColumn; col !== endColumn; col += columnStep) {
        const merge = (i: number) => {
          if (row - i < 0)
            return

          const current = _board[row][col]
          const next = _board[row - i][col]

          if (current && next && current![0] === next![0] && !merges.includes(_board[row - i][col][1])) {
            _board[row - i][col]! = [_board[row][col]![0] * 2, _board[row][col]![1]]
            score.value += _board[row - i][col]![0]
            _board[row][col] = null
            merges.push(_board[row - i][col][1])

            if (_board[row - i][col]![0] === WINNING_SCORE && !hasWon.value)
              hasWon.value = true

            return
          }
          else if (_board[row - i][col] !== null) { return }

          merge(i + 1)
        }

        merge(1)
      }
    }

    for (let row = startRow; row !== endRow; row += rowStep) {
      for (let col = startColumn; col !== endColumn; col += columnStep) {
        for (let i = row; i > 0; i--) {
          if (_board[i - 1][col] === null) {
            _board[i - 1][col] = _board[i][col]
            _board[i][col] = null
          }
        }
      }
    }

    _board = rotateMatrix(_board, _board.length - rotations)

    if (!isArrayEqual(_board, board.value))
      _board = setRandomTile(_board)

    board.value = _board

    onMoveHook.trigger(direction)
  }

  const largestTile = computed(() => Math.max(...board.value.map(x => x.map(y => y ? y[0] : 0)).flat()))

  const up = () => move('up')
  const down = () => move('down')
  const left = () => move('left')
  const right = () => move('right')

  return {
    board,
    score,
    init,
    up,
    down,
    left,
    right,
    move,
    seed,
    isGameOver,
    hasWon,
    largestTile,
    onWon: onDidWinHook.on,
    onMove: onMoveHook.on,
  }
}
