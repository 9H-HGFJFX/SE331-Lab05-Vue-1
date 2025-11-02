<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
// 注：EventInfo 未使用，可删除（若后续需要再引入）
// import EventInfo from '@/components/EventInfo.vue'
import { type Event } from '@/types'

import { ref, onMounted, computed, watchEffect } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import EventService from '@/services/EventService'

const router = useRouter()
const route = useRoute() // 可用于直接读取路由参数，增强灵活性

// 1. 接收父组件/路由传递的 props
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 2
  }
})

// 2. 计算属性：依赖 props 动态变化
const currentPage = computed(() => props.page)
const currentPageSize = computed(() => props.pageSize)

// 3. 响应式数据：存储事件列表和总条数
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

// 4. 计算属性：判断是否有下一页（使用动态 pageSize）
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / currentPageSize.value)
  return currentPage.value < totalPages
})

// 5. 每页条数切换：更新路由参数，触发页面刷新
const updatePageSize = (event: globalThis.Event) => {
  const target = event.target as HTMLSelectElement
  const newSize = parseInt(target.value)
  router.push({
    name: 'event-list-view',
    query: {
      page: '1', // 切换条数时重置到第一页
      pageSize: newSize.toString()
    }
  })
}

// 6. 页面挂载/参数变化时，请求事件数据（使用动态 pageSize）
onMounted(() => {
  // watchEffect：监听 currentPage 和 currentPageSize 变化，自动重新请求
  watchEffect(() => {
    EventService.getEventsByPage(currentPageSize.value, currentPage.value)
      .then((response) => {
        events.value = response.data
        // 从响应头获取总条数（确保后端正确返回 x-total-count）
        totalEvents.value = Number(response.headers['x-total-count']) || 0
        console.log('当前页事件：', events.value)
        console.log('总事件数：', totalEvents.value)
      })
      .catch((error) => {
        console.error('请求事件列表失败：', error)
      })
  })
})
</script>

<template>
  <div>
    <h1>Events For Good</h1>

    <!-- 1. 每页条数选择器 -->
    <div class="page-size-selector">
      <label>Display per page: </label>
      <select
        @change="updatePageSize($event)"
        :value="pageSize"
      >
        <option value="2">2 pieces</option>
        <option value="3">3 pieces</option>
        <option value="5">5 pieces</option>
      </select>
    </div>

    <!-- 2. 事件卡片容器：用 Tailwind 类实现居中布局，删除冗余 .events 类 -->
    <div class="flex flex-col items-center">
      <!-- 循环渲染事件卡片（判断 events 非空，避免报错） -->
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        v-if="events"
      />
    </div>

    <!-- 3. 分页控件：删除空的分页容器，保留一个即可 -->
    <div class="pagination">
      <RouterLink
        id="page-prev"
        v-if="currentPage !== 1"
        :to="{
          name: 'event-list-view',
          query: { page: currentPage - 1, pageSize: currentPageSize }
        }"
        rel="prev"
      >
        &#60; Previous Page
      </RouterLink>

      <RouterLink
        id="page-next"
        v-if="hasNextPage"
        :to="{
          name: 'event-list-view',
          query: { page: currentPage + 1, pageSize: currentPageSize }
        }"
        rel="next"
      >
        Next page &#62;
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* 1. 删除冗余的 .events 样式（已用 Tailwind 类替代） */
/* 2. 删除未使用的 .event-container 样式（若后续需要再添加） */

/* 分页样式：保留并优化 */
.pagination {
  display: flex;
  width: 290px;
  margin: 20px auto 0;
  justify-content: center;
  gap: 8px; /* 增加按钮间距，避免拥挤 */
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: background-color 0.3s;
  text-align: center; /* 统一文本居中，优化视觉 */
}

.pagination a:hover {
  background-color: #f5f5f5;
}

/* 每页条数选择器样式：保留 */
.page-size-selector {
  text-align: center;
  margin: 10px 0;
}

.page-size-selector select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
