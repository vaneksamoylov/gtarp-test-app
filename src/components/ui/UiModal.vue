<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/60" @click="handleClose"></div>

      <div
        class="relative z-10 w-full max-w-md mx-4 rounded-lg border border-sky-700 bg-sky-950 shadow-xl p-5"
      >
        <button
          class="absolute right-3 top-3 text-sky-300 hover:text-white transition-colors"
          type="button"
          @click="handleClose"
        >
          &times;
        </button>

        <div class="mb-4 text-center text-sky-100">
          <h3 v-if="title" class="mb-2 text-lg font-semibold">
            {{ title }}
          </h3>
          <p class="text-sm sm:text-base">
            {{ text }}
          </p>
        </div>

        <div class="flex w-full gap-2">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  title?: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit('close');
};
</script>