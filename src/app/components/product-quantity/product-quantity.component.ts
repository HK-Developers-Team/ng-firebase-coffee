import { ToastService } from './../../core/services/toast.service';
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

  check: boolean;

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.check = this.cartService.removeFormCart(this.product)
    if (this.check) {
      this.toastService.show(`Delete 1 ${this.product.title} from cart.`, {
        classname: 'bg-success text-light',
        delay: 2000,
        autohide: true,
        headertext: 'Success'
      });
    }
  }
}
