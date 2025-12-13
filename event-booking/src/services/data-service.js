const serverURL = 'http://localhost:3001'

export default {
  getEvents() {
    return fetch(`${serverURL}/events`).then((res) => res.json())
  },

  getBookings() {
    return fetch(`${serverURL}/bookings`).then((res) => res.json())
  },

  async handleRegistration(event, bookings) {
    if (bookings.value.some((b) => b.eventId === event.id && b.userId === 1)) {
      alert('You have already booked this event.')
      return
    }

    const newBooking = {
      id: Date.now().toString(),
      userId: 1,
      eventId: event.id,
      eventTitle: event.title,
      date: new Date().toISOString(),
      status: 'confirmed'
    }

    // optimistic update: pending
    bookings.value.push({ ...newBooking, status: 'pending' })

    try {
      const response = await fetch(`${serverURL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      })

      if (response.ok) {
        const updatedBooking = await response.json()
        const index = findIndex(bookings.value, newBooking.id)
        if (index !== -1) {
          bookings.value[index] = updatedBooking
        }
        return updatedBooking
      } else {
        // remove the optimistic pending item
        bookings.value = bookings.value.filter((b) => b.id !== newBooking.id)
        const text = await response.text()
        throw new Error('Failed to confirm booking: ' + (text || response.status))
      }
    } catch (err) {
      // rollback optimistic update
      bookings.value = bookings.value.filter((b) => b.id !== newBooking.id)
      console.error('handleRegistration error:', err)
      throw err
    }
  },

  async handleCancellation(bookingId, bookings) {
    const index = findIndex(bookings.value, bookingId)
    if (index === -1) {
      alert('Booking not found.')
      return
    }

    // set cancelling optimistic state
    bookings.value[index].status = 'cancelling'

    try {
      const res = await fetch(`${serverURL}/bookings/${bookingId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        bookings.value.splice(index, 1)
      } else {
        bookings.value[index].status = 'confirmed'
        const text = await res.text()
        throw new Error('Failed to cancel booking: ' + (text || res.status))
      }
    } catch (error) {
      // rollback cancel
      bookings.value[index].status = 'confirmed'
      console.error('handleCancellation error:', error)
      throw error
    }
  }
}

function findIndex(list, id) {
  if (Array.isArray(list)) {
    return list.findIndex((item) => item.id === id)
  }
  return -1
}
