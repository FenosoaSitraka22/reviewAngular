import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../models/product.model';
import { UUID } from 'angular2-uuid';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<Product>;
  constructor() {
    this.products = [
      { id: UUID.UUID(), name: 'Computer', price: 6500, promotion: true },
      { id: UUID.UUID(), name: 'PC', price: 1500, promotion: false },
      { id: UUID.UUID(), name: 'Phone', price: 2500, promotion: true },
    ];
    for (let i = 0; i < 10; i++) {
      this.products.push({
        id: UUID.UUID(),
        name: 'Computer',
        price: 6500,
        promotion: true,
      });
      this.products.push({
        id: UUID.UUID(),
        name: 'PC',
        price: 1500,
        promotion: false,
      });
      this.products.push({
        id: UUID.UUID(),
        name: 'Phone',
        price: 2500,
        promotion: true,
      });
    }
  }

  getProducts(): Observable<Product[]> {
    if (Math.random() < 0.1)
      return throwError(() => new Error('Internet connexion'));
    return of(this.products);
  }

  getPageProducts(page: number, size: number): Observable<PageProduct> {
    let index = page * size;

    return of({
      page: page,
      size: size,
      products: this.products.slice(index, index + size),
      totalPages:
        this.products.length % size === 0
          ? this.products.length / size
          : Math.trunc(this.products.length / size) + 1,
    });
  }
  deleteProduct(id: string): Observable<boolean> {
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
