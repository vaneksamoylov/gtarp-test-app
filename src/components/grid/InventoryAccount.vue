<template>
  <div
    class="flex items-center justify-between px-4 py-2 border-b-2 border-black bg-sky-950 shadow-2xl"
  >
    <div class="flex text-left flex-col">
      <h2 class="font-bold text-3xl text-white">{{ name }}</h2>
      <p class="text-xl text-white">{{ vacancyLabel }}</p>
    </div>

    <img class="max-w-[100px] rounded-full" :src="img" :alt="name" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  vacancyLabel: string;
  img: string;
}>();
</script>
