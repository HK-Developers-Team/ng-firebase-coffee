import { Product } from './../../../core/models/product.model';
import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  dtOptions: DataTables.Settings = {};

  dtTrigger = new Subject();

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.productService.getAll()
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        this.dtTrigger.next();
      });

  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
  
  private extractData(res: Response) {
    const body: any = res.json();
    return body.data || {};
  }
}
