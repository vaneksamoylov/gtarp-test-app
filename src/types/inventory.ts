export type InventoryRole = 'seller' | 'customer';

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  weight: number;
  amount: number;
}
