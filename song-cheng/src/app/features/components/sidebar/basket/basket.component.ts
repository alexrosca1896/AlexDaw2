import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BasketFacadeService } from '../../../services/basket.service';
import { OrderService } from '../../../services/order.service';
import { ReactiveComponent } from '../../../../core/utils/reactive.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent extends ReactiveComponent {
  constructor(
    public basketFacadeService: BasketFacadeService,
    private orderService: OrderService
  ) {
    super();
  }

  public confirmOrder() {
    this.orderService
      .createOrder(1, this.basketFacadeService.getItems())
      .subscribe(() => {
        this.basketFacadeService.clear();
        // mostrar snackbar, redirect, etc.
      });
  }
}
