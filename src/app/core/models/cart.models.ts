import { Product } from './product.model';
import { CartItem } from './cart-item.models';
import { DocumentSnapshot, DocumentChangeAction } from '@angular/fire/firestore';
export class CartModel {
    items: CartItem[] = [];

    constructor(public itemsMap: { [productId: string]: DocumentChangeAction<CartItem> }) {
        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
            let item = itemsMap[productId].payload.doc.data();
            this.items.push(new CartItem({ ...item, id: itemsMap[productId].payload.doc.id }));
        }
    }


    getQuantity(product: Product) {
        for (let productId in this.itemsMap) {
            let item = this.itemsMap[productId].payload.doc.data();
            if (item.id === product.id)
                return item ? item.quantity : 0;
        }
        return 0;
    }


    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }
}