import dataService from '@/services/data-service'
import { ref } from 'vue'

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

export default function useBookings() {
  return {
    bookings,
    loading,
    error,
    fetchBookings
  }
}
