import { UserService } from './user.service';
import { CartItem } from './../models/cart-item.models';
import { CartModel } from './../models/cart.models';
import { Product } from './../models/product.model';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { take, map, tap } from 'rxjs/operators';
import { firestore } from 'firebase';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFirestore, private userService: UserService) { }

  check(uid: string) {
    let cartId = localStorage.getItem('cartId');
    return this.db.doc(`carts/${cartId}`).set({
      uid: uid,
      createdAt: new Date()
    }).then(() => {
      
    })
  }

  create(uid: string) {
    return this.db.collection('carts').add({
      uid: uid,
      createdAt: new Date()
    })
  }

  async getCart(): Promise<Observable<CartModel>> {
    let cartId = await this.getOrCreateCart();
    return this.db.doc(`carts/${cartId}`).collection('items').snapshotChanges()
      .pipe(map((x: any) => new CartModel(x)));
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    let batch = this.db.firestore.batch();
    let ref = await this.db.doc(`carts/${cartId}`).collection('items').ref.get();
    ref.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }

  private getItems(cartId: string, productId: string) {
    return this.db.doc(`carts/${cartId}/items/${productId}`)
  }

  async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const user = this.userService.getUser();
    if (user) {
      let res = await this.create(user.uid)
      localStorage.setItem('cartId', res.id);
      return res.id
    }

  }

  addToCart(product: Product) {
    const check = this.userService.checkLogin();
    if (check) {
      this.updateItemQuantity(product, 1);
      return check;
    }
    return check;
  }

  removeFormCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCart();
    let items$ = this.getItems(cartId, product.id);
    items$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      if (item) {
        let quantity = (item.quantity || 0) + change;
        if (quantity === 0) return items$.delete().then(result => console.log('deleted', result)).catch(err => console.log(err.message));

        items$.set({
          ...product,
          quantity: quantity
        }, { merge: true })
      } else {
        items$.set({
          ...product,
          quantity: 1
        })
      }
    })
  }

  // if (item) {
  //   items$.set({
  //     product: product,
  //     quantity: (item.quantity || 0) + 1
  //   })
  // } else {
}
