import { ProductFormComponent } from './pages/admin/product-form/product-form.component';
import { AdminGuard } from './core/guard/admin.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './pages/admin/orders/orders.component';
import { ProductsComponent as AdminProducts } from './pages/admin/products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },

  { path: 'admin/orders', component: OrdersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/products', component: AdminProducts, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
