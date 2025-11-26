<template>
  <div
    class="flex flex-col md:flex-row md:items-center justify-between w-full px-4 py-3 border-b border-sky-700 bg-sky-900 hover:bg-sky-800 transition-colors gap-3 md:gap-4"
  >
    <div class="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
      <img
        :src="item.icon"
        :alt="item.name"
        class="w-16 h-16 md:w-12 md:h-12 object-cover rounded shrink-0"
      />
      <div class="flex flex-col min-w-0 flex-1">
        <h3 class="font-medium text-lg text-white truncate">{{ item.name }}</h3>
        <div class="flex flex-col md:flex-row md:items-center md:gap-2">
          <p class="text-sm text-sky-300">Вес: {{ item.weight }} кг</p>
          <p class="text-sm text-sky-200 font-medium md:hidden">Количество: {{ item.amount }}</p>
        </div>
      </div>
    </div>

    <div class="hidden md:flex items-center gap-2 mx-4">
      <span class="text-white font-medium text-lg min-w-12 text-center">
        {{ item.amount }}
      </span>
    </div>

    <div class="flex items-center justify-end md:justify-start gap-2 shrink-0">
      <template v-if="isUserInventory">
        <UiButton
          size="sm"
          variant="primary"
          :disabled="item.amount <= 1"
          :class="{ 'opacity-50 cursor-not-allowed': item.amount <= 1 }"
          title="Уменьшить количество"
          @click="handleDecrease"
        >
          -
        </UiButton>
        <UiButton size="sm" variant="primary" title="Увеличить количество" @click="handleIncrease">
          +
        </UiButton>
        <UiButton size="sm" variant="danger" title="Удалить предмет" @click="openDeleteModal">
          <TrashIcon class="w-5 h-5" />
        </UiButton>
      </template>

      <template v-else>
        <UiButton
          variant="success"
          :full-width="true"
          class="md:w-auto"
          title="Добавить в инвентарь"
          @click="handleAddToInventory"
        >
          Добавить
        </UiButton>
      </template>
    </div>

    <UiModal
      v-if="isUserInventory && showDeleteModal"
      title="Удалить предмет"
      :text="modalText"
      @close="closeDeleteModal"
    >
      <template #actions>
        <UiButton class="flex-1" size="sm" variant="ghost" @click="closeDeleteModal">
          Отмена
        </UiButton>
        <UiButton class="flex-1" size="sm" variant="danger" @click="confirmRemove">
          Удалить
        </UiButton>
      </template>
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TrashIcon from '@/components/icons/TrashIcon.vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiModal from '@/components/ui/UiModal.vue';
import { useInventoryStore } from '@/stores/inventory';
import type { InventoryItem } from '@/types/inventory';

const props = defineProps<{
  item: InventoryItem;
  isUserInventory?: boolean;
}>();

const inventoryStore = useInventoryStore();
const showDeleteModal = ref(false);
const modalText = computed(() => 
  `Вы уверены, что хотите удалить «${props.item.name}» из инвентаря?`
);

const handleAddToInventory = () => {
  inventoryStore.addItem(props.item);
};

const handleIncrease = () => {
  inventoryStore.increaseAmount(props.item.id);
};

const handleDecrease = () => {
  inventoryStore.decreaseAmount(props.item.id);
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const confirmRemove = () => {
  inventoryStore.removeItem(props.item.id);
  showDeleteModal.value = false;
};
</script>
