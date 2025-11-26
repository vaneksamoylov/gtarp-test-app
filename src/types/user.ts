export type InventoryRole = 'seller' | 'customer';

export type User = {
    name: string,
    role: InventoryRole,
    'vacancy-label': string,
    img: string,
}
