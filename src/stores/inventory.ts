import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { InventoryItem } from '@/types/inventory';

const LOCAL_STORAGE_NAME = 'inventory'

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<InventoryItem[]>([]);

  const loadFromStorage = (): boolean => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_NAME);

      if (!saved) {
        return false;
      }

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        items.value = parsed;
        return true;
      } else {
        console.warn('Invalid inventory data format in localStorage');
        return false;
      }
    } catch (error) {
      console.error('Failed to load inventory from localStorage:', error);
      try {
        localStorage.removeItem(LOCAL_STORAGE_NAME);
      } catch (removeError) {
        console.error('Failed to remove corrupted inventory data:', removeError);
      }
      return false;
    }
  };

  const saveToStorage = (): boolean => {
    try {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(items.value));
      return true;
    } catch (error) {
      console.error('Failed to save inventory to localStorage:', error);
      if (error instanceof DOMException) {
        if (error.name === 'QuotaExceededError') {
          console.error('localStorage quota exceeded. Cannot save inventory.', error);
        } else if (error.name === 'SecurityError') {
          console.error('localStorage access denied. Cannot save inventory.', error);
        }
      }
      return false;
    }
  };

  const addItem = (item: InventoryItem): boolean => {
    try {
      const existingItem = items.value.find(i => i.id === item.id);
  
      if (existingItem) {
        existingItem.amount += item.amount;
      } else {
        items.value.push({ ...item });
      }
  
      saveToStorage();
      return true;
    } catch (error) {
      console.error('Failed to add item to inventory:', error);
      return false;
    }
  };

  const removeItem = (itemId: string): boolean => {
    try {
      const index = items.value.findIndex(i => i.id === itemId);
      if (index !== -1) {
        items.value.splice(index, 1);
        saveToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to remove item from inventory:', error);
      return false;
    }
  };

  const increaseAmount = (itemId: string, amount: number = 1): boolean => {
    try {
      const item = items.value.find(i => i.id === itemId);
      if (item) {
        item.amount += amount;
        saveToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to increase item amount:', error);
      return false;
    }
  };

  const decreaseAmount = (itemId: string, amount: number = 1): boolean => {
    try {
      const item = items.value.find(i => i.id === itemId);
      if (item) {
        if (item.amount > amount) {
          item.amount -= amount;
        } else {
          return removeItem(itemId);
        }
        saveToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to decrease item amount:', error);
      return false;
    }
  };

  const totalAmount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.amount, 0);
  });

  const totalWeight = computed(() => {
    return items.value.reduce((sum, item) => sum + item.weight * item.amount, 0);
  });

  return {
    items,
    loadFromStorage,
    addItem,
    removeItem,
    increaseAmount,
    decreaseAmount,
    totalAmount,
    totalWeight,
  };
});
