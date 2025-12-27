<template>Link</template>
<script setup lang="ts">
import type { TabProps } from '@/types/tabProps'

const props = defineProps<TabProps>()
defineEmits<{
  click: []
}>()
</script>
