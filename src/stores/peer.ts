import { defineStore } from 'pinia'
import type { DataConnection } from 'peerjs'
import { Peer } from 'peerjs'

export const usePeerStore = defineStore('peer', () => {
  const id = ref<string>()
  const isOpen = ref<boolean>(false)
  const isConnected = ref<boolean>(false)
  const onConnectedHook = createEventHook<void>()
  const onDisconnectedHook = createEventHook<void>()
  const onErrorHook = createEventHook<any>()
  const onMessageHook = createEventHook<any>()

  let from: DataConnection
  let to: DataConnection

  const peer = new Peer({
    debug: 2,
  })

  id.value = peer.id

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
    onMessageHook.trigger(data)
  }

  const connect = async (id: string) => {
    await until(isOpen).toBeTruthy()
    from = peer.connect(id)

    from.on('open', onOpen)
    from.on('close', onClose)
    from.on('error', onError)
    from.on('data', onData)
  }

  peer.on('open', () => {
    isOpen.value = true
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

  const sendMessage = <T>(message: T) => {
    if (to)
      to.send(message)
    else if (from)
      from.send(message)
  }

  return {
    id,
    isOpen,
    isConnected,

    connect,
    sendMessage,

    onConnected: onConnectedHook.on,
    onDisconnected: onDisconnectedHook.on,
    onError: onErrorHook.on,
    onMessage: onMessageHook.on,
  }
})
