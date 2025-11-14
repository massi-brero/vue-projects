const { createApp, onMounted, onBeforeUnmount, ref } = Vue

const App = {
  setup() {
    const tasks = ref([
      { id: 1, title: 'Buy groceries', priority: 'High', done: false },
      { id: 2, title: 'Walk the dog', priority: 'Medium', done: true },
      { id: 3, title: 'Read a book', priority: 'Low', done: false },
    ])
    const newTaskInput = ref(null)
    onMounted(() => {
      newTaskInput.value.focus()
    })
    return {
      newTaskInput,
      tasks,
    }
  },
}

createApp(App).mount('#app')
