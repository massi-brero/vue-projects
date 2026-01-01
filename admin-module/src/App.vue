<template>
  <main class="max-w-80 flex items-center px-5"></main>
  <nav class="font-medium text-center text-gray-500 border-b border-gray-400 mb-4">
    <Tabs :tabs="tabs"></Tabs>
  </nav>
</template>

<script setup lang="ts">
import type { Tab } from '@/types/tab'
import Tabs from './components/Tabs.vue'

const tabs: Tab[] = [
  { key: 'general', label: 'General' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'privacy', label: 'Privacy' },
]
</script>
