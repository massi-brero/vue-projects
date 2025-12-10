<template>
  <div>
    <section class="grid grid-cols-2 gap-8" x>
      <template v-if="!loading">
        <EventCard
          v-for="e in events"
          :key="e.id"
          :title="e.title"
          :when="e.date"
          :description="e.description"
          @register="emit('register', e)"
        />
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import LoadingEventCard from '@/components/LoadingEventCard.vue'
import dataService from '@/services/data-service.js'

const events = ref([])
const loading = ref(false)

const emit = defineEmits(['register'])

const fetchEvents = async () => {
  loading.value = true
  try {
    try {
      events.value = await dataService.getEvents()
    } catch (err) {
      console.log('Error fetching events', err)
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEvents()
})
</script>
