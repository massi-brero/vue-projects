<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h1 class="text-2xl font-medium">All Events</h1>
    <EventCard />
    <h1 class="text-2xl font-medium">Yout Bookings</h1>
  </main>
</template>

<script setup>
import EventCard from '@/components/EventCard.vue'
</script>
