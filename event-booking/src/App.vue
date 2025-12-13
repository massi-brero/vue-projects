<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h1 class="text-2xl font-medium">All Events</h1>

    <EventList @register="onRegisterEvent" />
    <BookingList ref="bookingListRef" />
  </main>
</template>

<script setup>
import EventList from './components/EventList.vue'
import BookingList from './components/BookingList.vue'
import { ref } from 'vue'

const bookingListRef = ref(null)

const onRegisterEvent = (event) => {
  if (bookingListRef.value?.addBooking) {
    bookingListRef.value.addBooking(event)
  } else {
    console.warn('BookingList not mounted yet')
  }
}
</script>
