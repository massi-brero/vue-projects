<template>
  <div>
    <template v-if="error">
      <SectionCard>
        <div class="space-y-4 items-center flex justify-center flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-red-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-red-500 text-center">Failed to load events. Please try again later.</p>
          <Round-button @click="fetchEvents()">Retry</Round-button>
        </div>
      </SectionCard>
    </template>
    <template v-else>
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-8" x>
        <template v-if="!loading">
          <template v-if="events.length > 0">
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
            <div class="col-span-2 text-center text-gray-500">No events available.</div>
          </template>
        </template>
        <template v-else>
          <LoadingEventCard v-for="i in 4" :key="i" />
        </template>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import LoadingEventCard from '@/components/LoadingEventCard.vue'
import dataService from '@/services/data-service.js'
import SectionCard from '@/components/SectionCard.vue'
import RoundButton from '@/components/RoundButton.vue'

const events = ref([])
const loading = ref(false)
const error = ref(null)

const emit = defineEmits(['register'])

const fetchEvents = async () => {
  loading.value = true
  error.value = null

  try {
    events.value = await dataService.getEvents()
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEvents()
})
</script>
