
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore, private router: Router) { }

  async create(product) {
    const result = await this.db.collection('products').add(product);
    this.db.doc(`products/${result.id}`).set({
      id: result.id
    }, { merge: true })
    return this.router.navigate(['/admin/products']);
  }

  getAll() {
    return this.db.collection<Product>('products').valueChanges();
  }

  get(productId) {
    return this.db.doc<Product>(`products/${productId}`).valueChanges();
  }

  async update(id,product) {
    const result = await this.db.doc(`products/${id}`).set(product, { merge: true })
    return this.router.navigate(['/admin/products']);
  }

  async delete(idProduct) {
    await this.db.doc(`products/${idProduct}`).delete();
    return this.router.navigate(['/admin/products']);
  }
}
