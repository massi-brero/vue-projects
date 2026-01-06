<template>
  <main class="max-w-80 flex items-center px-5"></main>
  <nav class="block px-4 py-2">
    <Tabs :tabs="tabs"></Tabs>
  </nav>
</template>

<script setup lang="ts">
import GeneralSettings from '@/components/GeneralSettings.vue'
import NotificationsSettings from '@/components/NotificationsSettings.vue'
import PrivacySettings from '@/components/PrivacySettings.vue'
import Tabs from '@/components/Tabs.vue'
import type { Tab } from '@/types/tab'

const tabs: Tab[] = [
  { key: 'general', label: 'General', component: GeneralSettings },
  { key: 'notifications', label: 'Notifications', component: NotificationsSettings },
  { key: 'privacy', label: 'Privacy', component: PrivacySettings }, // Placeholder component
]
</script>
