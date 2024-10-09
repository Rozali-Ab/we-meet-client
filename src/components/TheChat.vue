<template>
  <div class="rounded-lg bg-white p-3">
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="msg in messages" :key="msg" class="flex justify-between py-1">
        <div class="flex flex-row">
          <div class="flex-col">
            <p class="text-xs text-gray-500">{{ msg.name }}</p>
            <p class="text-sm font-semibold text-gray-900">{{ msg.message }}</p>
          </div>
        </div>
<!--          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">-->
<!--            <p class="mt-1 text-xs leading-5 text-gray-500">-->
<!--              <time :datetime="msg.date">{{ msg.date }}</time>-->
<!--            </p>-->
<!--        </div>-->
      </li>
    </ul>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <label for="message" class="block text-sm font-medium leading-6 text-gray-900"></label>
      <div class="my-1">
        <input
          v-model="newMessage"
          id="message"
          name="message"
          type="text"
          required
          class="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Отправьте сообщение"
        />
      </div>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="onSendMessage"
      >
        send
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['sendMessage'])

defineProps({
  messages: {
    type: Array,
    default: () => []
  }
})

const newMessage = ref('')

const onSendMessage = () => {
  if (!String(newMessage.value).trim()) return

  emit('sendMessage', newMessage.value)
  newMessage.value = ''
}
</script>
