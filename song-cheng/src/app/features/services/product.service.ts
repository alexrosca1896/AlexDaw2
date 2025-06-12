import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { ApiEndpoints } from '../../core/constants/api-endpoints';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpService) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(ApiEndpoints.PRODUCTS);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(ApiEndpoints.PRODUCT_BY_ID(id));
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(ApiEndpoints.PRODUCTS, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(ApiEndpoints.PRODUCT_BY_ID(id));
  }
}
