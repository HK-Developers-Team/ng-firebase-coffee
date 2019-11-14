import { Product } from './product.model';
export class CartItem {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<CartItem>) {
        Object.assign(this, init);
    }
    
    get totalPrice() { return this.price * this.quantity; }
}