import { defineStore } from 'pinia'
import type { DataConnection } from 'peerjs'
import Peer from 'peerjs'

export interface PeerMessage {
  message: string
  payload?: Record<string, string | number>
}

export const usePeerStore = defineStore('peer', () => {
  const id = ref<string>()
  const isOpen = ref<boolean>(false)
  const isConnected = ref<boolean>(false)
  const onConnectedHook = createEventHook<void>()
  const onDisconnectedHook = createEventHook<void>()
  const onErrorHook = createEventHook<any>()
  const onMessageHook = createEventHook<PeerMessage>()

  let from: DataConnection
  let to: DataConnection
  let peer: Peer | undefined

  const onOpen = () => {
    isConnected.value = true
    onConnectedHook.trigger()
  }

  const onClose = () => {
    isConnected.value = false
    onDisconnectedHook.trigger()
  }

  const onError = (e: any) => {
    onErrorHook.trigger(e)
  }

  const onData = (data: any) => {
    onMessageHook.trigger(data as PeerMessage)
  }

  const createPeer = (_id?: string) => {
    if (_id)
      peer = new Peer(_id, { debug: 2 })
    else
      peer = new Peer({ debug: 2 })

    peer.on('open', () => {
      isOpen.value = true

      if (peer)
        id.value = peer.id
    })

    peer.on('close', () => {
      isOpen.value = false
    })

    peer.on('connection', (conn) => {
      to = conn

      to.on('open', onOpen)
      to.on('close', onClose)
      to.on('error', onError)
      to.on('data', onData)
    })

    peer.on('disconnected', () => {
      onDisconnectedHook.trigger()
    })

    peer.on('error', (e) => {
      onErrorHook.trigger(e)
    })
  }

  const destroyPeer = () => {
    if (peer)
      peer.destroy()

    peer = undefined
  }

  const connect = async (id: string) => {
    await until(isOpen).toBeTruthy()

    if (peer)
      from = peer.connect(id)

    from.on('open', onOpen)
    from.on('close', onClose)
    from.on('error', onError)
    from.on('data', onData)
  }

  const disconnect = async () => {
    if (peer)
      peer.disconnect()
  }

  const sendMessage = (message: string, payload?: any) => {
    if (to)
      to.send({ message, payload })
    else if (from)
      from.send({ message, payload })
  }

  const onMessage = (message: string, cb: (payload?: any) => void) => {
    onMessageHook.on((msg) => {
      if (msg.message === message)
        cb(msg.payload)
    })
  }

  return {
    id,
    isOpen,
    isConnected,

    createPeer,
    destroyPeer,

    connect,
    disconnect,
    sendMessage,

    onConnected: onConnectedHook.on,
    onDisconnected: onDisconnectedHook.on,
    onError: onErrorHook.on,
    onMessage,
  }
})
