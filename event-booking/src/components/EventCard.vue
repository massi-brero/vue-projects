<template>
  <SectionCard>
    <template #header>{{ title }}</template>
    <div>{{ when }}</div>
    <template #footer>
      <p>{{ description }}</p>
      <div class="flex justify-end">
        <RoundButton @click="$emit('register')" class="p-9 mt-4">
          <pre>Register</pre>
        </RoundButton>
      </div>
    </template>
  </SectionCard>
</template>

<script setup>
import RoundButton from '@/components/RoundButton.vue'
import SectionCard from './SectionCard.vue'
defineProps({ title: String, when: String, description: String })
defineEmits(['register'])
</script>

<style lang="scss" scoped></style>
