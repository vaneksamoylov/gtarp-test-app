<template>
  <svg
    :class="iconClass"
    :width="size"
    :height="size"
    :stroke="color"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4
         a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  class?: string;
}>();

const size = props.size ?? 20;
const color = props.color ?? 'currentColor';
const strokeWidth = props.strokeWidth ?? 2;
const iconClass = props.class ?? 'w-5 h-5';
</script>
