<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h1 class="text-2xl font-medium">All Events</h1>
    <section class="grid grid-cols-2 gap-8" x>
      <template v-if="!loadingEvents">
        <EventCard
          v-for="e in events"
          :key="e.id"
          :title="e.title"
          :when="e.date"
          :description="e.description"
          @register="addBooking(e)"
        />
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <template v-if="!loadingBookings">
      <section class="grid grid-cols-1 gap-4">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
        />
      </section>
    </template>
    <template v-else><LoadingBookingItem v-for="i in 4" :key="i" /> </template>
  </main>
</template>

<script setup>
import BookingItem from '@/components/BookingItem.vue'
import EventCard from '@/components/EventCard.vue'
import dataService from '@/services/data-service.js'
import { onMounted, ref } from 'vue'
import LoadingEventCard from './components/LoadingEventCard.vue'
import LoadingBookingItem from './components/LoadingBookingItem.vue'

const events = ref([])
const bookings = ref([])
const loadingEvents = ref(false)
const loadingBookings = ref(false)

const fetchEvents = async () => {
  loadingEvents.value = true
  try {
    try {
      events.value = await dataService.getEvents()
    } catch {
      console.log('Error fetching events')
    }
  } finally {
    loadingEvents.value = false
  }
}

const fetchBookings = async () => {
  loadingBookings.value = true
  try {
    try {
      bookings.value = await dataService.getBookings()
    } catch (err) {
      console.log('Error fetching bookings')
    }
  } finally {
    loadingBookings.value = false
  }
}

const addBooking = async (event) => {
  try {
    await dataService.handleRegistration(event, bookings)
  } catch (err) {
    console.log('Error adding booking', err)
  }
}

onMounted(async () => {
  fetchEvents()
  fetchBookings()
})
</script>
