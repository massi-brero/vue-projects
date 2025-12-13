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
      <BookingItem
        v-for="booking in bookings"
        :key="booking.id"
        :title="booking.eventTitle"
        :status="booking.status"
        @cancel="cancelBooking(booking.id)"
      />
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue'
import BookingItem from './BookingItem.vue'
import LoadingBookingItem from './LoadingBookingItem.vue'
import dataService from '@/services/data-service.js'

const bookings = ref([])
const loading = ref(false)
const error = ref(null)

const fetchBookings = async () => {
  loading.value = true
  error.value = null
  try {
    bookings.value = await dataService.getBookings()
  } catch (err) {
    error.value = err?.message || 'Failed to fetch bookings'
    bookings.value = []
  } finally {
    loading.value = false
  }
}

const addBooking = async (event) => {
  try {
    await dataService.handleRegistration(event, bookings)
  } catch (err) {
    error.value = err?.message || 'Could not add booking'
    alert(error.value)
  }
}

const cancelBooking = async (bookingId) => {
  try {
    await dataService.handleCancellation(bookingId, bookings)
  } catch (err) {
    error.value = err?.message || 'Could not cancel booking'
    alert(error.value)
  }
}

// Make addBooking available to parent
defineExpose({ addBooking })

onMounted(() => {
  fetchBookings()
})
</script>

<style scoped>
/* optional style */
</style>
