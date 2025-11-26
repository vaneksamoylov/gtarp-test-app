<template>
  <main class="w-full h-screen grid gap-2 lg:grid-cols-2">
    <InventoryGrid />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import InventoryGrid from '@/components/grid/InventoryGrid.vue';
import { useInventoryStore } from '@/stores/inventory';

const inventoryStore = useInventoryStore();

onMounted(() => {
  inventoryStore.loadFromStorage();
});
</script>
