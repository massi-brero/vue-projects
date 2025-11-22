<template>
  <SectionCard>
    <template #header>{{ title }}</template>
    <div>{{ when }}</div>
    <template #footer>
      <p>{{ description }}</p>
      <div class="flex justify-end">
        <RoundButton @click="$emit('register')" class="p-9">
          <pre>Register</pre>
        </RoundButton>
      </div>
    </template>
  </SectionCard>
</template>

<script setup>
import SectionCard from './SectionCard.vue'
import RoundedCard from './RoundedCard.vue'
import RoundButton from '@/components/RoundButton.vue'
defineProps({ title: String, when: String, description: String })
defineEmits(['register'])
</script>

<style lang="scss" scoped></style>
