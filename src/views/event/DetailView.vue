<script setup lang="ts">
import { toRefs } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
}>()
const { event } = toRefs(props)

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div class="flashMessage" v-if="message">
    <h4>{{ message }}</h4>
  </div>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<style scoped>
@keyframes yellowfade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
.flashMessage {
  animation: yellowfade 3s ease-in-out;
  padding: 10px;
  margin-bottom: 20px;
}
</style>