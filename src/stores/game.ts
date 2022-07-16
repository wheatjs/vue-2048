import { defineStore } from 'pinia'
import { usePeerStore } from './peer'
import type { Direction } from '~/composables/use2048'

export interface GameMessage {
  type: string
  payload: Record<string, string | number>
}

export const useGameStore = defineStore('game', () => {
  const highScore = useLocalStorage('highScore', 0)
  const peer = usePeerStore()
  const isMultiplayer = ref(false)
  const localGame = use2048()
  const remoteGame = use2048()
  const link = computed(() => `${window.location.origin}?game=${peer.id}`)

  const onSessionStartedHook = createEventHook()
  const onSessionEndedHook = createEventHook()
  const onPlayerJoined = createEventHook()
  const onPlayerLeft = createEventHook()

  const parmas = new URLSearchParams(window.location.search)
  const gameId = parmas.get('game')

  if (gameId)
    peer.connect(gameId)

  /**
   * On new connection sync local game states.
   */
  peer.onConnected(async () => {
    const seed = Math.random()
    localGame.init(seed)
    isMultiplayer.value = true

    setTimeout(() => {
      peer.sendMessage<GameMessage>({
        type: 'init',
        payload: {
          seed,
        },
      })
    })
  })

  /**
   * Set to single player when peer disconnects.
   */
  peer.onDisconnected(() => {
    isMultiplayer.value = false
  })

  /**
   * Handle remote game commands
   */
  peer.onMessage((message: GameMessage) => {
    if (message.type === 'init') {
      const seed = message.payload.seed
      remoteGame.init(seed as number)
    }

    if (message.type === 'move') {
      const direction = message.payload.direction
      remoteGame.move(direction as Direction)
    }
  })

  localGame.onMove((direction) => {
    if (isMultiplayer.value) {
      peer.sendMessage<GameMessage>({
        type: 'move',
        payload: {
          direction,
        },
      })
    }
  })

  localGame.init()

  const newGame = () => {
    localGame.init()
  }

  watch(localGame.score, () => {
    if (localGame.score.value > highScore.value)
      highScore.value = localGame.score.value
  })

  return {
    newGame,
    isMultiplayer,
    link,
    localGame,
    remoteGame,
    highScore,

    onSessionStarted: onSessionStartedHook.on,
    onSessionEnded: onSessionEndedHook.on,
    onPlayerJoined: onPlayerJoined.on,
    onPlayerLeft: onPlayerLeft.on,
  }
})
