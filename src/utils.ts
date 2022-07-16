export function rotateMatrix(matrix: any[][], rotations: number) {
  const rotate = () => {
    // Traverse each cycle
    const N = matrix.length

    for (let i = 0; i < N / 2; i++) {
      for (let j = i; j < N - i - 1; j++) {
        // Swap elements of each cycle
        // in clockwise direction
        const temp = matrix[i][j]
        matrix[i][j] = matrix[N - 1 - j][i]
        matrix[N - 1 - j][i] = matrix[N - 1 - i][N - 1 - j]
        matrix[N - 1 - i][N - 1 - j] = matrix[j][N - 1 - i]
        matrix[j][N - 1 - i] = temp
      }
    }
  }

  for (let i = 0; i < rotations; i++)
    rotate()

  return matrix
}

export function createRandom(seed: number) {
  seed = Math.floor(seed * (10000 - 0 + 1)) + 0

  return function (min?: number, max?: number) {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    const result = ((t ^ t >>> 14) >>> 0) / 4294967296

    if (typeof min !== 'undefined' && typeof max !== 'undefined')
      return Math.floor(result * (max - min + 1)) + min

    return result
  }
}

export function isArrayEqual(array1: any[], array2: any[]) {
  if (!Array.isArray(array1) || !Array.isArray(array2))
    return array1 === array2

  if (array1.length !== array2.length)
    return false

  for (let i = 0, len = array1.length; i < len; i++) {
    if (!isArrayEqual(array1[i], array2[i]))
      return false
  }

  return true
}

export function deepClone(arr: any[]) {
  const len = arr.length
  const newArr = new Array(len)
  for (let i = 0; i < len; i++) {
    if (Array.isArray(arr[i]))
      newArr[i] = deepClone(arr[i])

    else
      newArr[i] = arr[i]
  }
  return newArr
}
