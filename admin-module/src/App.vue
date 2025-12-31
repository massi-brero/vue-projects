<template>
  <main class="max-w-80 flex items-center px-5"></main>
  <nav class="font-medium text-center text-gray-500 border-gray-500 mb-4">
    <ul class="flex flex-wrap">
      <li v-for="tab in tabs" :key="tab.key">
        <TabLink :tab="tab" :currentTab="currentTab" />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import TabLink from '@/components/TabLink.vue'
import type { Tab } from '@/types/tab'
import type { TabKey } from '@/types/tabKey'
import { ref } from 'vue'

const tabs: Tab[] = [
  { key: 'general', label: 'General' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'privacy', label: 'Privacy' },
]

const currentTab = ref<TabKey>('general')
</script>
