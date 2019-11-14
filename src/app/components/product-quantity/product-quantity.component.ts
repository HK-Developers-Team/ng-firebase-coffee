import { CartModel } from './../../core/models/cart.models';
import { Product } from './../../core/models/product.model';
import { CartService } from './../../core/services/cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})

export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('cart') cart: CartModel; 

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFormCart(this.product)
  }
}
