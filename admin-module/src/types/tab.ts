import type { Component } from 'vue'

export type Tab = {
  key: string
  label: string
  component: Component
  icon?: string
}
