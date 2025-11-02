import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/9H-HGFJFX/event-mock-server',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  // 新增带分页参数的方法
  getEventsByPage(pageSize: number, page: number) {
    return apiClient.get('/events', {
      params: {
        _limit: pageSize,
        _page: page
      }
    })
  },
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  }
}
