export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected: boolean;
}

export interface IUserData {
    email: string;
    phone: string;
    address: string;
    payment: string;
    total: number;
    items: string[];
}

export interface IAppState {
    catalog: IProduct[];
    basket: IProduct[];
    previw: IProduct | null;
    order: IUserData | null;
}

export type OrderForm = Omit<IUserData, 'total' | 'items'>;

export type FormError = Partial<Record<keyof OrderForm, string>>;

export type IOrder = IProduct & IUserData;

export type OrderSuccess = Pick<IOrder, 'id' & 'total'>;