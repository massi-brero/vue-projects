<template>
  <SectionCard>
    <template #header>{{ title }}</template>
    <div>{{ when }}</div>
    <template #footer>
      <p id="event_description">{{ description }}</p>
      <div class="flex justify-end">
        <RoundButton @click="$emit('register')" class="p-9 mt-4">
          <span>Register</span>
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

<style scoped>
@media screen and (max-width: 1024px) {
  #event_description {
    display: none;
  }
}
</style>
