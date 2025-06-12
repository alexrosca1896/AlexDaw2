import { Component, OnInit } from '@angular/core';
import { ProductFacadeService } from '../../product-list/service/product.service';
import { ReactiveComponent } from '../../../../core/utils/reactive.component';
import { CommonModule } from '@angular/common';
import { CategoryFacadeService } from './service/category-facade.service';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatExpansionModule, MatListModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent extends ReactiveComponent implements OnInit {
  constructor(
    public productFacadeService: ProductFacadeService,
    public categoryFacadeService: CategoryFacadeService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.categoryFacadeService
      .getCategories()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  public onCategoryClick(id: number | null): void {
    this.productFacadeService.selectCategory(id);
  }
}
