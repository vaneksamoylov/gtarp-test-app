import { items, seller, customer } from "./mocks";
import type {InventoryItem} from "@/types/inventory";
import type { User } from "@/types/user";

export const api = {
    getItems: () => {
        // Возвращаем тестовые товары для продавца

        return new Promise<InventoryItem[]>(resolve => setTimeout(() => {
            resolve(items)
        }, 1000))
    },
    getSeller: () => {
        // Возвращаем тестовые данные продавца

        return new Promise<User>(resolve => setTimeout(() => {
            resolve(seller)
        }, 1000))
    },
    getCustomer: () => {
        // Возвращаем тестовые данные покупателя

        return new Promise<User>(resolve => setTimeout(() => {
            resolve(customer)
        }, 1000))
    },
}