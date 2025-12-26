<template>
  <section class="space-y-4">
    <h2 class="text-2xl font-medium">Your Bookings</h2>

    <template v-if="loading">
      <LoadingBookingItem v-for="i in 4" :key="i" />
    </template>

    <template v-else-if="error">
      <div class="text-center">
        <p class="text-red-600 mb-4">Error: {{ error }}</p>
        <button class="rounded bg-blue-600 text-white px-3 py-1" @click="fetchBookings">
          Retry
        </button>
      </div>
    </template>

    <template v-else-if="bookings.length === 0">
      <div class="text-center">No Bookings yet.</div>
    </template>

    <section v-else class="grid grid-cols-1 gap-4">
      <template v-if="!loading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancel="cancelBooking(booking.id)"
        />
      </template>
    </section>
  </section>
</template>

<script setup>
import useBookings from '@/composables/useBookings'
import { onMounted } from 'vue'
import BookingItem from './BookingItem.vue'
import LoadingBookingItem from './LoadingBookingItem.vue'

const { bookings, loading, error, fetchBookings, addBooking, cancelBooking } = useBookings()

onMounted(() => {
  fetchBookings()
})
</script>

<style scoped>
/* optional style */
</style>
