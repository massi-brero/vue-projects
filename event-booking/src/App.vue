<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h1 class="text-2xl font-medium">All Events</h1>
    <section class="grid grid-cols-2 gap-8">
      <EventCard
        v-for="i in 8"
        :key="i"
        title="Vue Conf 2025"
        when="2025/12/12"
        description="A Vue Conference"
        @register="console.log('registered')"
      />
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
</script>
