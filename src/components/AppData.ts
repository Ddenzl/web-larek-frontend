import { FormError, IAppState, IProduct, IUserData, OrderForm } from "../types";
import { EVENT_TYPES } from "../utils/constants";
import { IEvents } from "./base/events";
import { Model } from "./base/Model";

export class AppState extends Model<IAppState> {
    catalog: IProduct[] = [];
    basket: IProduct[] = [];
    preview: IProduct['id'] | null = null;
    order: IUserData  =  {
		email: '',
		phone: '',
		address: '',
		payment: '',
		total: 0,
		items: [],
	};
    formErrors: FormError = {};
    
    constructor(data: Partial<IAppState>, events: IEvents) {
        super(data, events);
    }

    setCatalog(items: IProduct[]) {
        this.catalog = items;
        this.emitChanges(EVENT_TYPES.CATALOG_CHANGE);
    }

    setPreview(item: IProduct) {
        this.preview = item.id;
    }

    addToBasket(item: IProduct) {
        this.basket = [...this.basket, item];
        this.emitChanges(EVENT_TYPES.BASKET_CHANGE);
    }

    removeFromBasket(id: string) {
        this.basket = this.basket.filter((item) => item.id !== id);
        this.emitChanges(EVENT_TYPES.BASKET_CHANGE);
    }

    clearBasket() {
		this.basket = [];
		this.emitChanges(EVENT_TYPES.BASKET_CHANGE);
	}

    clearOrder() {
        this.order = {
            email: '',
            phone: '',
            address: '',
            payment: '',
            total: 0,
            items: [], 
        };
        this.formErrors = {};
    }

    clearAll() {
        this.clearBasket();
        this.clearOrder();
    }

    getTotalPrice(): IUserData['total'] {
        return this.basket.reduce((total, item) => total + (item.price || 0), 0);
    }

    getBasketItems() {
        return this.basket.length;
    }

    selected(): void {
        this.order.items = this.basket.map((items) => items.id);
    }

    prepareOrder(): IUserData {
        this.selected();
        this.order.total = this.getTotalPrice();
        return this.order;
    }

    validateOrder() {    
        const errors: typeof this.formErrors = {};
    
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if (!this.order.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        }
    
        this.formErrors = errors;
        this.emitChanges(EVENT_TYPES.ORDER_ERRORS_CHANGE, this.formErrors);
    
        return Object.keys(errors).length === 0;
    }

    validateContact() {
        const errors: typeof this.formErrors = {};
    
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
    
        this.formErrors = errors;
        this.emitChanges(EVENT_TYPES.CONTACTS_ERRORS_CHANGE, this.formErrors);
    
        return Object.keys(errors).length === 0;
    }

    setOrderInput(field: keyof OrderForm, value: string) {
        if (field === 'email' || field === 'phone') {
            this.order[field] = value;
            this.validateContact();
        } else {
            this.order[field] = value;
            this.validateOrder();
        }
    }
}