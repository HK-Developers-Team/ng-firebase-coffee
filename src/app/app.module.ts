import { environment } from './../environments/environment';
import { NgbComponentModule } from './core/modules/ngb.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProductsComponent } from './pages/products/products.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProductsComponent as AdminProducts } from './pages/admin/products/products.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { ProductFormComponent } from './pages/admin/product-form/product-form.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DataTablesModule } from 'angular-datatables';
import { ProductCardComponent } from './pages/products/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    HomeComponent,
    OrdersComponent,
    AdminProducts,
    ProductFormComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbComponentModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
