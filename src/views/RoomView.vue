<template>
  <div class="h-lvh bg-gray-100">
    <h3>Room</h3>
    <hr />
    <p v-if="currentUser">
      <b>Current User: {{ currentUser.name }}</b>
    </p>
    <hr />
    <h4>Active users:</h4>
    <ul v-for="user in activeUsers" :key="user.id">
      <li>
        <span>{{ user.name }}</span>
      </li>
    </ul>

    <div class="mx-auto w-full px-6 text-center sm:w-1/2 lg:w-1/3 lg:max-w-7xl lg:px-8">
      <TheChat :messages="messages" @send-message="sendNewMessage($event)" />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import TheChat from '@/components/TheChat.vue'
import { onChatMessage, socket } from '@/web-socket/index.js'
import { SOCKET_EVENTS } from '@/web-socket/constants/web-socket-events.js'

export default {
  components: {
    TheChat
  },
  setup() {
    const currentUser = ref(null)

    const activeUsers = ref([])
    const messages = reactive([])

    socket.on(SOCKET_EVENTS.UPDATE_ACTIVE_USERS, (data) => {
      activeUsers.value = data
    })

    socket.on(SOCKET_EVENTS.SOCKET_MESSAGE, (data) => {
      messages.push(data)
    })

    socket.on(SOCKET_EVENTS.CONNECT_USER, (data) => {
      currentUser.value = data.currentUser
      activeUsers.value = data.activeUsers
    })

    const sendNewMessage = (msg) => {
      if (!currentUser.value) {
        console.log('User is not initialized yet.')
        return
      }

      const newMessage = {
        name: currentUser.value.name,
        message: msg,
        date: new Date().toLocaleString()
      }

      onChatMessage(newMessage)

      newMessage.name = 'You'
      messages.push(newMessage)
    }

    return {
      currentUser,
      activeUsers,
      messages,
      sendNewMessage
    }
  }
}
</script>
