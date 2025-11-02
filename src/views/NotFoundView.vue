<script setup lang="ts">


const props = withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page'
  }
)
</script>

<template>
  <h1>Oops!</h1>
  <h3>The {{ resource }} you're looking for is not here.</h3>
  <h3>您查找的 {{ resource }} 不存在。</h3>
  
  <router-link :to="{ name: 'event-list-view' }">Back to the home page</router-link>
  <router-link :to="{ name: 'event-list-view' }">返回首页</router-link>
</template>