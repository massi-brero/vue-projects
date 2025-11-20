<template>
  <div class="border border-gray-400 bg-white rounded-md p-2">
    <h3 class="p-4 font-medium text-xl border-b border-gray-200">{{ title }}</h3>
    <p class="p-4 border-b border-gray-200">{{ when }}</p>
    <p class="p-4">{{ description }}</p>
    <section class="flex justify-end">
      <button
        class="text-small font-medium border border-gray-400 rounded-full px-3 py-1 hover:bg-gray-100 cursor-pointer"
        @click="$emit('register')"
      >
        Register
      </button>
    </section>
  </div>
</template>

<script setup>
defineProps({ title: String, when: String, description: String })
defineEmits(['register'])
</script>

<style lang="scss" scoped></style>
