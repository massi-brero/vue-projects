<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h1 class="text-2xl font-medium">All Events</h1>
    <EventList @register="addBooking($event)"></EventList>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <template v-if="!loadingBookings">
      <section class="grid grid-cols-1 gap-4">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancel="cancelBooking(booking.id)"
        />
      </section>
    </template>
    <template v-else><LoadingBookingItem v-for="i in 4" :key="i" /> </template>
  </main>
</template>

<script setup>
import BookingItem from '@/components/BookingItem.vue'
import dataService from '@/services/data-service.js'
import { onMounted, ref } from 'vue'
import LoadingBookingItem from './components/LoadingBookingItem.vue'
import EventList from './components/EventList.vue'

const bookings = ref([])
const loadingBookings = ref(false)

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

const cancelBooking = async (bookingId) => {
  await dataService.handleCancellation(bookingId, bookings)
}

onMounted(async () => {
  fetchBookings()
})
</script>
