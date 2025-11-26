<template>
  <InventoryGridPane
    :user="seller"
    :items="sellerItems"
    :is-loading="isLoading"
  />
  <InventoryGridPane
    :user="customer"
    :is-loading="isLoading"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '@/api';
import type { InventoryItem } from '@/types/inventory';
import InventoryGridPane from '@/components/grid/InventoryGridPane.vue';

const sellerItems = ref<InventoryItem[]>([]);
const seller = ref();
const customer = ref();
const isLoading = ref(true);

onMounted(async () => {
  try {
    const [items, sellerData, customerData] = await Promise.all([
      api.getItems(),
      api.getSeller(),
      api.getCustomer(),
    ]);

    sellerItems.value = items;
    seller.value = sellerData;
    customer.value = customerData;
  } catch (error) {
    console.error('Failed to load data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>
