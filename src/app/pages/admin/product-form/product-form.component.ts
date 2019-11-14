import { Product } from './../../../core/models/product.model';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../core/services/product.service';
import { CategoryService } from './../../../core/services/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$;

  product: any = {};
  initialized : boolean = false

  id;

  constructor(private categoryService: CategoryService, private productService: ProductService, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != 'new') {
      this.productService.get(this.id).subscribe(p => {
        console.log(this.id)
        this.initialized = true
        this.product = p;
      })
    }
    this.categoryService.getCategories().subscribe(list => this.categories$ = list);
  }

  save(value) {
    if(this.id && this.id != 'new') this.productService.update(this.id, value);
    else this.productService.create(value);
  }

  delete() {
    if (confirm('Are you sure want to delete this product?')) {
      this.productService.delete(this.id);
    }
  }
}
