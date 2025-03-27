import { IProduct, IUserData, OrderSuccess } from "../../types";
import { Api, ApiListResponse } from "../base/api";

export interface IProductsApi {
    getProductsList: () => Promise<IProduct[]>;
}

export class ProductsApi extends Api implements IProductsApi {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }   

    getProductsList(): Promise<IProduct[]> {
        return this.get('/product')
        .then((data: ApiListResponse<IProduct>) => data.items)
        .catch(error => {
            console.error('Ошибка при получении каталога товаров:', error);
            throw error;
        });
    };

    createOrder(order: IUserData): Promise<OrderSuccess> {
        return this.post('/order', order)
        .then((res: OrderSuccess) => res)
        .catch(error => {
            console.error('Ошибка при создании заказа:', error);
            throw error;
        });
    }
}