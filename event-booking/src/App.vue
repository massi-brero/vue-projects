<template>
  <main class="container mx-auto my-8 space-y-8 sm:pl-2">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h1 class="text-2xl font-medium">All Events</h1>

    <EventList />
    <BookingList />
  </main>
</template>

<script setup>
import BookingList from './components/BookingList.vue'
import EventList from './components/EventList.vue'
</script>
