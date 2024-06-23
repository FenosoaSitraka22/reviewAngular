import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<Product>;
  constructor() {
    this.products = [
      { id: 1, name: 'Computer', price: 6500, promotion: true },
      { id: 2, name: 'PC', price: 1500, promotion: false },
      { id: 3, name: 'Phone', price: 2500, promotion: true },
    ];
  }

  getProducts(): Observable<Product[]> {
    if (Math.random() < 0.1)
      return throwError(() => new Error('Internet connexion'));
    return of(this.products);
  }

  deleteProduct(id: number): Observable<boolean> {
    this.products = this.products.filter((p) => p.id != id);
    return of(true);
  }
  setProductPromotion(product: Product): Observable<boolean> {
    let id = this.products.indexOf(product);
    product.promotion = !product.promotion;
    this.products[id] = product;
    return of(true);
  }
  searchProduct(keyword: string): Observable<Product[]> {
    return of(
      this.products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }
}
