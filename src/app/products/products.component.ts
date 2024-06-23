import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage!: string;

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
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
        console.log('++++');
        product.promotion = !promotion;
      },
      error: (err) => {},
    });
  }
}
import { Product } from '../models/product.model';
