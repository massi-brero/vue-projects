<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h1 class="text-2xl font-medium">All Events</h1>
    <section class="grid grid-cols-2 gap-8" x>
      <template v-if="!loading">
        <EventCard
          v-for="e in events"
          :key="e.id"
          :title="e.title"
          :when="e.date"
          :description="e.description"
          @register="dataService.handleRegistration(e)"
        />
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <BookingItem v-for="i in 3" :key="i" />
    </section>
  </main>
</template>

<script setup>
import BookingItem from '@/components/BookingItem.vue'
import EventCard from '@/components/EventCard.vue'
import dataService from '@/services/data-service.js'
import { onMounted, ref } from 'vue'
import LoadingEventCard from './components/LoadingEventCard.vue'

const events = ref([])
const loading = ref(false)

const fetchEvents = async () => {
  loading.value = true
  try {
    events.value = await dataService.getEvents()
  } finally {
    loading.value = false
  }
}
onMounted(async () => fetchEvents())
</script>
