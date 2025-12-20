<template>
  <SectionCard>
    <div class="flex justify-between items-center">
      <div class="flex space-x-2">
        <div>{{ title }}</div>
        <div>
          <component :is="icon" :class="pending ? 'animate-spin' : 'text-green-500'"></component>
        </div>
      </div>
      <RoundButton variant="danger" @click="$emit('cancel')">Cancel</RoundButton>
    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from '@/components/SectionCard.vue'
import RoundButton from '@/components/RoundButton.vue'
import { LoaderCircle, Check } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  title: String,
  status: String
})
const pending = computed(() => (props.status === 'pending') | (props.status === 'cancelling'))
const icon = computed(() => (pending.value ? LoaderCircle : Check))

defineEmits(['cancel'])
</script>
