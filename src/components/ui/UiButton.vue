<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-sky-900',
      sizeClass,
      variantClass,
      fullWidth ? 'w-full' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'primary' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md';
  type?: 'button' | 'submit';
  fullWidth?: boolean;
  disabled?: boolean;
}>();

const variantClass = computed(() => {
  switch (props.variant ?? 'primary') {
    case 'danger':
      return 'bg-red-600 hover:bg-red-700 text-white';
    case 'ghost':
      return 'bg-transparent text-white hover:bg-white/10';
    case 'success':
      return 'bg-green-600 hover:bg-green-700 text-white';
    default:
      return 'bg-sky-700 hover:bg-sky-600 text-white';
  }
});

const sizeClass = computed(() => {
  switch (props.size ?? 'md') {
    case 'sm':
      return 'px-3 py-1.5 text-sm';
    default:
      return 'px-4 py-2 text-base';
  }
});

const type = computed(() => props.type ?? 'button');
const fullWidth = computed(() => props.fullWidth ?? false);
const disabled = computed(() => props.disabled ?? false);
</script>
