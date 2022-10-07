import { defineStore } from 'pinia'
import { usePeerStore } from './peer'
import type { Direction } from '~/composables/use2048'

export interface GameMessage {
  message: string
  payload?: Record<string, string | number>
}

export const useGameStore = defineStore('game', () => {
  const highScore = useLocalStorage('highScore', 0)
  const peer = usePeerStore()
  const localGame = use2048()
  const remoteGame = use2048()

  const onRemotePlayerJoined = createEventHook()
  const onRemotePlayerLeft = createEventHook()

  const isMultiplayerGameOpen = ref(false)
  const isRemotePlayerConnected = ref(false)

  const openMultiplayerGame = () => {
    peer.createPeer()

    isMultiplayerGameOpen.value = true
  }

  const closeMultiplayerGame = () => {
    peer.destroyPeer()
    isMultiplayerGameOpen.value = false
    const params = new URLSearchParams(window.location.search)
    params.delete('game')
    window.history.pushState({}, '', window.location.pathname)
    remoteGame.init(Math.random())
  }

  const joinMultiplayerGame = (id: string) => {
    openMultiplayerGame()
    peer.connect(id)
  }

  const leaveMultiplayerGame = () => {
    peer.disconnect()
    closeMultiplayerGame()
  }

  const startNewGame = (silent = false) => {
    const seed = Math.random()
    localGame.init(seed)

    if (isRemotePlayerConnected.value)
      peer.sendMessage('new-game', { seed, silent })
  }

  peer.onConnected(() => {
    isRemotePlayerConnected.value = true
    startNewGame()
  })

  peer.onDisconnected(() => {
    isRemotePlayerConnected.value = false
  })

  localGame.onMove((direction: Direction) => peer.sendMessage('move', { direction }))

  peer.onMessage('new-game', ({ seed, silent }: { seed: number; silent: boolean }) => {
    remoteGame.init(seed)

    if (!silent)
      startNewGame(true)
  })
  peer.onMessage('move', ({ direction }: { direction: Direction }) => remoteGame.move(direction))

  watch(localGame.score, () => {
    if (localGame.score.value > highScore.value)
      highScore.value = localGame.score.value
  })

  const isWaitingForOtherPlayer = computed(() => isMultiplayerGameOpen.value && !isRemotePlayerConnected.value)

  startNewGame()

  return {
    openMultiplayerGame,
    closeMultiplayerGame,

    localGame,
    remoteGame,
    highScore,

    startNewGame,

    isMultiplayerGameOpen: readonly(isMultiplayerGameOpen),
    isRemotePlayerConnected: readonly(isRemotePlayerConnected),
    isWaitingForOtherPlayer: readonly(isWaitingForOtherPlayer),

    joinMultiplayerGame,
    leaveMultiplayerGame,

    link: computed(() => `${window.location.origin}?game=${peer.id}`),

    onRemotePlayerJoined: onRemotePlayerJoined.on,
    onRemotePlayerLeft: onRemotePlayerLeft.on,
  }
})
