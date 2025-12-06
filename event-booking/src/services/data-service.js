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
        const index = bookings.value.findIndex((b) => b.id === newBooking.id)
        bookings.value[index] = await response.json()
        console.log(bookings)
      }
    } catch (err) {
      bookings.value = bookings.value.filter((b) => b.id === 'confirmed')
      throw new Error('Failed to confirm booking', err)
    }
  }
}
