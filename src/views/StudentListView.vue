<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService, { type Student } from '@/services/StudentService'

const students = ref<Student[]>([])

onMounted(() => {
  StudentService.getStudents()
    .then(response => {
      console.log(response.data)
      students.value = response.data
    })
    .catch(error => {
      console.error('There was an error fetching students!', error)
    })
})
</script>

<template>
  <h1>Students Information</h1>
  <div class="students">
    <div v-for="student in students" :key="student.id" class="student-card">
      <h2>{{ student.name }} {{ student.surname }}</h2>
      <p>GPA: {{ student.gpa }}</p>
    </div>
  </div>
</template>

<style scoped>
.students {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.student-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.student-card h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.student-card p {
  font-size: 1.1rem;
  color: #666;
}
</style>