<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import {storeToRefs} from "pinia";

const store = useMessageStore()
const {message} = storeToRefs(store)

//import EventCard from './components/EventCard.vue'
</script>

<template>

    <div class="text-center font-sans text-gray-700 antialias">

     <header>
       <div id="flashMessage" class="animate-fade" v-if="message">
         <h4>{{ message }}</h4>
       </div>
       <div class="wrapper">
         <h4>{{ message }}</h4>
        </div>
        <div class="wapper">
          <nav class="py-6">
                      <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'event-list-view' }">Event</RouterLink> |
                      <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about' }">About</RouterLink>
                      <RouterLink :to="{ name: 'student-list-view' }">Students</RouterLink>
          </nav>
        </div>
     </header>
      <main class="main-content">
        <RouterView />
      </main>
    </div>
</template>

<style >

 nav {
   padding: 30px;

}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

 h2{
   font-size:20px;
 }
 @keyframes yellowfade {
   from {
     background-color: yellow;
   }
   to {
     background-color: transparent;
   }
 }
 #flashMessage{
   animation:yellowfade 3s ease-in-out;
 }

</style>
