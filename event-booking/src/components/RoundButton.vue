<template>
  <button :class="['text-small px-3 py-1 rounded-full', variants[variant] ?? variants.default]">
    <slot></slot>
  </button>
</template>

<script setup>
const variants = {
  default: 'font-medium border border-gray-400',
  danger: 'bg-red-200 enabled:hover:bg-red-100 text-red-900'
}
defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})
</script>
