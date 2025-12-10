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

    bookings.value.push({ ...newBooking, status: 'pending' })

    try {
      const response = await fetch(`${serverURL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBooking)
      })

      if (response.ok) {
        const index = findIndex(bookings.value, newBooking.id)
        console.log(index)

        bookings.value[index] = await response.json()
        console.log(bookings)
      }
    } catch (err) {
      bookings.value = bookings.value.filter((b) => b.id !== 'confirmed')
      alert('Failed to confirm booking', err)
    }
  },

  async handleCancellation(bookingId, bookings) {
    const index = findIndex(bookings.value, bookingId)
    if (index === -1) {
      alert('Booking not found.')
      return
    }
    const bookingToCancel = bookings.value[index]
    bookings.value[index].status = 'cancelling'

    try {
      const res = await fetch(`${serverURL}/bookings/${bookingId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        bookings.value.splice(index, 1)
      } else {
        alert('Failed to cancel booking')
      }
    } catch (error) {
      alert('Server Error')
      bookings.value[index].status = 'confimed'
      console.log(error)
    }
  }
}
function findIndex(list, id) {
  if (Array.isArray(list)) {
    return list.findIndex((item) => item.id === id)
  }
  return -1
}
