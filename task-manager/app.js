const {
  createApp,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  watchEffect,
  computed,
} = Vue

const App = {
  setup() {
    const mockTasks = ref([
      { id: 1, title: 'Buy groceries', priority: 'High', done: false },
      { id: 2, title: 'Walk the dog', priority: 'Medium', done: true },
      { id: 3, title: 'Read a book', priority: 'Low', done: false },
    ])
    const newTaskInput = ref(null)
    const newTaskTitle = ref('')
    const newPriority = ref('Medium')
    const filteredText = ref(null)
    const tasks = ref(JSON.parse(localStorage.getItem('tasks')) ?? mockTasks)
    const filteredTasks = computed(() => {
      console.log('hey')

      if (filteredText.value === null || filteredText.value === '') {
        return tasks.value
      }
      return tasks.value.filter((task) =>
        task.title.toLowerCase().includes(filteredText.value.toLowerCase())
      )
    })

    onMounted(() => {
      newTaskInput.value.focus()
      filteredTasks.value = tasks.value
    })

    watch(
      tasks,
      () => {
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
      },
      { deep: true }
    )

    addTask = () => {
      if (newTaskTitle.value.trim() === '' || newPriority.value.trim() === '') {
        return
      }

      const newTask = {
        id: tasks.value.length + 1,
        title: newTaskTitle.value,
        priority: newPriority.value,
        done: false,
      }
      tasks.value.unshift(newTask)
      resetForm()
    }

    function resetForm() {
      newTaskTitle.value = ''
      newPriority.value = ''
      newTaskInput.value.focus()
    }
    return {
      newTaskInput,
      tasks,
      newTaskTitle,
      newPriority,
      addTask,
      filteredTasks,
      filteredText,
    }
  },
}

createApp(App).mount('#app')
