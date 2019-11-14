import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartModel } from 'src/app/core/models/cart.models';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<CartModel>;
  cart: CartModel;
  constructor(private cartService: CartService) { }

  
  isMobile = false;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  async ngOnInit() {

    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(cart => {
      this.cart = cart
    })
    
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
  }

  clearCart() {
    this.cartService.clearCart();
  }

}
