import { io } from 'socket.io-client'
import { SOCKET_EVENTS } from '@/web-socket/constants/web-socket-events.js'

export const socket = io(import.meta.env.SERVER_PORT || 'http://localhost:3000')

socket.on(SOCKET_EVENTS.CONNECT, () => {
  console.log('Подключение установлено:', socket.id)
})

socket.on(SOCKET_EVENTS.DISCONNECT, () => {
  console.log('disconnect ', socket.id)
})

export const onUserJoin = (username) => {
  socket.emit(SOCKET_EVENTS.JOIN, username)
}

export const onChatMessage = (message) => {
  socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, message)
}
