import { Observable } from 'rxjs';
import { CartModel } from './../../core/models/cart.models';
import { CartService } from './../../core/services/cart.service';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isMenuCollapsed = true;
  cart$: Observable<CartModel>;
  cart: CartModel;
  constructor(public service: AuthService, private cartService: CartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(cart => this.cart = cart);
  }

}
