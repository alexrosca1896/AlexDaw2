import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { ApiEndpoints } from '../../core/constants/api-endpoints';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpService) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(ApiEndpoints.CATEGORIES);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(ApiEndpoints.CATEGORY_BY_ID(id));
  }
}
