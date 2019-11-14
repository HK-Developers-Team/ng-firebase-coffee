import { ToastService } from './../../core/services/toast.service';
import { CartModel } from './../../core/models/cart.models';
import { CartService } from './../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../core/services/category.service';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  products: Product[];
  filteredProducts: Product[];
  categories$;
  category;

  cart$: Observable<CartModel>;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
      .pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap
      })).subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products
  }


  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Toast Header'
    });
  }

}
