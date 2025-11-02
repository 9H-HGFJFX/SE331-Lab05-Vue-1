<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-info">
    <div class="info-item">{{ event.category }}</div>
    <div class="info-item">{{ event.organizer }}</div>
  </div>
</template>

<style scoped>
.event-info {
  width: 250px;
  margin-bottom: 18px;
  padding: 10px 20px;
  border: 1px solid #39495c;
}

.info-item {
  font-size: 14px;
  text-align: right;
  margin-bottom: 5px;
}
</style>