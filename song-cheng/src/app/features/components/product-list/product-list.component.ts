import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { takeUntil } from 'rxjs';
import { ReactiveComponent } from '../../../core/utils/reactive.component';
import { ProductFacadeService } from './service/product.service';
import { Product } from '../../models/product.model';
import { BasketFacadeService } from '../../services/basket.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent extends ReactiveComponent implements OnInit {
  flippedProductId: number | null = null;
  selectedIngredientsProductId: number | null = null;

  constructor(
    public facade: ProductFacadeService,
    private basketFacadeService: BasketFacadeService
  ) {
    super();
  }

  ngOnInit() {
    this.facade
      .getProducts()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((products) => {
      });
  }

  addToCart(product: Product) {
    this.basketFacadeService.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      code: product.code,
    });
  }

  toggleFlip(id: number | null) {
    this.flippedProductId = id;
  }

  viewIngredients(product: Product) {
    this.selectedIngredientsProductId =
      this.selectedIngredientsProductId === product.id ? null : product.id;
  }
}
