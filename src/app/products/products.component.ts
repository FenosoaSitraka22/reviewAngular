import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    //generation de fb
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control(null),
    });
    this.handleGetAllProducts();
  }

  handleGetAllProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  handleDeleteProduct(p: Product) {
    if (confirm('êtes  vous sure de vouloire supprimer ?'))
      this.productService.deleteProduct(p.id).subscribe({
        next: (data) => {
          data ? this.products.splice(this.products.indexOf(p), 1) : '';
        },
        error: (err) => {
          this.errorMessage = err;
        },
      });
  }
  handleSetPromotion(product: Product) {
    let promotion = product.promotion;

    this.productService.setProductPromotion(product).subscribe({
      next: (data) => {
        product.promotion = !promotion;
      },
      error: (err) => {},
    });
  }
  handleSearch() {
    this.productService
      .searchProduct(this.searchFormGroup.value.keyword)
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          this.errorMessage = err;
        },
      });
  }
}
import { Product } from '../models/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
