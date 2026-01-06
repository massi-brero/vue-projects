<template>
  <div class="font-medium text-center text-gray-500 border-b border-gray-400 mb-4">
    <ul class="flex flex-wrap -mb-px">
      <li v-for="tab in tabs" :key="tab.key">
        <TabLink :tab="tab" :currentTab="currentTab" @click="currentTab = tab.key" />
      </li>
    </ul>
  </div>
  <Transition mode="out-in"
    ><component :is="currentTabComponent" v-if="currentTabComponent"
  /></Transition>
</template>

<script setup lang="ts">
import type { Tab } from '@/types/tab'
import { computed, ref } from 'vue'
import TabLink from './TabLink.vue'

const props = defineProps<{ tabs: Tab[] }>()
const currentTab = ref<string | null>(props.tabs[0]?.key || null)
const currentTabComponent = computed(
  () => props.tabs.find((t) => t.key === currentTab.value)?.component
)
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
