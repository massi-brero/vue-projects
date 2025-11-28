const serverURL = 'http://localhost:3002'

export default {
  getEvents() {
    return fetch(`${serverURL}/events`).then((res) => res.json())
  },

  getBookings() {
    return fetch(`${serverURL}/bookings`).then((res) => res.json())
  },

  async handleRegistration(event, bookings) {
    const newBooking = {
      id: Date.now().toString(),
      userId: 1,
      eventId: event.id,
      eventTitle: event.title,
      date: new Date().toISOString(),
      status: 'pending'
    }
    if (bookings) {
      bookings.value.push(newBooking)
    }
    const response = await fetch(`${serverURL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBooking)
    })
    return response.json()
  }
}
