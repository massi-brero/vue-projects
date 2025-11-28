const { createApp, ref, computed } = Vue
const App = {
  setup() {
    const message = ref('Can you drive a car?')
    let age = ref(null)
    const canDrive = computed(() => {
      return age.value >= 18
    })
    return { message, canDrive, age }
  },
}

createApp(App).mount('#app')
