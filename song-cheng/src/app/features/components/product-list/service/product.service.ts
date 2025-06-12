import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, catchError, of, tap, map } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Injectable({ providedIn: 'root' })
export class ProductFacadeService {
  private readonly _products$ = new BehaviorSubject<Product[]>([]);
  private readonly _selectedCategoryId$ = new BehaviorSubject<number | null>(null);

  public data$: Observable<Product[]>;

  constructor(private readonly productService: ProductService) {
    this.data$ = combineLatest([this._products$, this._selectedCategoryId$]).pipe(
      map(([products, categoryId]) =>
        categoryId != null ? products.filter(p => p.categoryId === categoryId) : products
      )
    );
  }

  public getProducts(): Observable<Product[]> {
    return this.productService.getAll().pipe(
      tap((products) => this._products$.next(products)),
      catchError(() => {
        this._products$.next([]);
        return of([]);
      })
    );
  }

  public selectCategory(categoryId: number | null): void {
    this._selectedCategoryId$.next(categoryId);
  }
}
