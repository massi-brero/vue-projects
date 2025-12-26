import dataService from '@/services/data-service'
import { ref } from 'vue'

const bookings = ref([])
const loading = ref(false)
const error = ref(null)
const bookingListRef = ref(null)

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

const onRegisterEvent = (event) => {
  addBooking(event)
}

export default function useBookings() {
  return {
    bookings,
    loading,
    error,
    fetchBookings,
    addBooking,
    cancelBooking,
    onRegisterEvent
  }
}
