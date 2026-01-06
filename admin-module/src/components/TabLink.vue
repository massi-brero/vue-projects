<template>
  <button>
    <a
      :class="[
        'block hover:text-blue-600 px-4 py-2',
        isActive ? 'text-blue-600 border-b-2 border-blue-600 bg-gray-100' : '',
      ]"
      @click="$emit('click')"
      href="#"
    >
      {{ tab.label }}
    </a>
  </button>
</template>
<script setup lang="ts">
import type { Tab } from '@/types/tab'
import { computed } from 'vue'

const props = defineProps<{ currentTab: string | null; tab: Tab }>()
const isActive = computed(() => props.currentTab === props.tab.key)
defineEmits<{
  click: []
}>()
</script>
