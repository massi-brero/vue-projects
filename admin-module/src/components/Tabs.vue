<template>
  <ul class="flex flex-wrap -mb-px">
    <li v-for="tab in tabs" :key="tab.key">
      <TabLink :tab="tab" :currentTab="currentTab" @click="currentTab = tab.key" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Tab } from '@/types/tab'
import { ref } from 'vue'
import TabLink from './TabLink.vue'

const props = defineProps<{ tabs: Tab[] }>()
const currentTab = ref<string | null>(props.tabs[0]?.key || null)
</script>
