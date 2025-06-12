import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';

@Injectable({ providedIn: 'root' })
export class CategoryFacadeService {
  private readonly _dataSub$ = new BehaviorSubject<Category[]>([]);
  public readonly data$ = this._dataSub$.asObservable();

  constructor(private readonly categoryService: CategoryService) {}

  public getCategories(): Observable<Category[]> {
    return this.categoryService.getAll().pipe(
      tap((categories) => {
        this._dataSub$.next(categories);
      }),
      catchError(() => {
        this._dataSub$.next([]);
        return of([]);
      })
    );
  }
}
