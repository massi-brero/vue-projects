const serverURL = 'http://localhost:3001'

export default {
  getEvents() {
    return fetch(`${serverURL}/events`).then((res) => res.json())
  }
}
