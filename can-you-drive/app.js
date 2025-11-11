const { createApp, ref, computed } = Vue
const App = {
  setup() {
    const message = ref('Quiz: Can you drive a car?')
    let age = ref(null)
    const canDrive = computed(() => {
      return age.value >= 18
        ? 'Yes, you can drive a car.'
        : 'No, you cannot drive a car.'
    })

    setTimeout(() => {
      age.value = 24
    }, 2000)

    return { message, canDrive }
  },
}

createApp(App).mount('#app')
