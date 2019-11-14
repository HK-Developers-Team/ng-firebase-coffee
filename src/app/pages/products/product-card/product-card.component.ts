import { ToastService } from './../../../core/services/toast.service';
import { CartModel } from './../../../core/models/cart.models';
import { Product } from './../../../core/models/product.model';
import { CartService } from './../../../core/services/cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('cart') cart: CartModel;

  check: boolean = true;

  constructor(private cartService: CartService, private toastService: ToastService) { }

  ngOnInit() {
    // console.log(this.cart.getQuantity(this.product))
    // console.log(this.cart)
  }
  addToCart() {
    this.check = this.cartService.addToCart(this.product);
    if (!this.check) {
      this.toastService.show('You need logged in to add product to cart!', {
        classname: 'bg-warning text-light',
        delay: 2000,
        autohide: true,
        headertext: 'Error!!!'
      });
    } else {
      this.toastService.show(`${this.product.title.toUpperCase()} abc has been added to the cart`, {
        classname: 'bg-warning text-light',
        delay: 2000,
        autohide: true,
        headertext: 'Error!!!'
      });
    }
  }
}
