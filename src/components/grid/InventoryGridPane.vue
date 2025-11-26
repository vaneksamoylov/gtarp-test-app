<template>
  <div class="flex flex-col w-full h-full max-h-screen bg-sky-800 overflow-hidden">
    <InventoryAccount :name="user?.name ?? 'UserName'" :vacancy-label="vacancyLabel" :img="user?.img ?? ''" />

    <div class="flex-1 overflow-y-auto">
      <template v-if="isLoading">
        <UiSpinner />
      </template>
      <template v-else-if="displayItems.length > 0">
        <InventoryGridItem
          v-for="item in displayItems"
          :key="item.id"
          :item="item"
          :is-user-inventory="isUserInventory"
        />
      </template>
      <div v-else class="flex items-center justify-center h-full text-sky-300 text-lg">
        <p>Инвентарь пуст</p>
      </div>
    </div>

    <div
      v-if="isUserInventory && displayItems.length > 0"
      class="border-t-2 border-sky-700 bg-sky-950 px-4 py-3"
    >
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-white"
      >
        <div class="flex flex-col">
          <span class="text-sm text-sky-300">Общее количество:</span>
          <span class="text-xl font-bold">{{ totalAmount }}</span>
        </div>
        <div class="flex flex-col sm:text-right">
          <span class="text-sm text-sky-300">Суммарный вес:</span>
          <span class="text-xl font-bold">{{ totalWeight.toFixed(2) }} кг</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InventoryAccount from './InventoryAccount.vue';
import InventoryGridItem from './InventoryGridItem.vue';
import UiSpinner from '@/components/ui/UiSpinner.vue';
import { useInventoryStore } from '@/stores/inventory';
import type { InventoryItem } from '@/types/inventory';
import type { User } from '@/types/user';

const props = defineProps<{
  user?: User;
  items?: InventoryItem[];
  isLoading?: boolean;
}>();

const inventoryStore = useInventoryStore();

const isUserInventory = computed(() => props.user?.role === 'customer');
const isLoading = computed(() => props.isLoading ?? false);
const vacancyLabel = computed(() => props.user?.['vacancy-label'] ?? 'vacancy');


const displayItems = computed(() => {
  if (isUserInventory.value) {
    return inventoryStore.items;
  } else {
    return props.items || [];
  }
});

const totalAmount = computed(() => {
  if (isUserInventory.value) {
    return inventoryStore.totalAmount;
  }
  return 0;
});

const totalWeight = computed(() => {
  if (isUserInventory.value) {
    return inventoryStore.totalWeight;
  }
  return 0;
});
</script>
