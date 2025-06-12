import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../core/constants/api-endpoints';
import { HttpService } from '../../core/services/http.service';
import { BasketItem } from '../models/basket.model';
import { Order } from '../models/order.model';

export interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpService) {}

  createOrder(clientId: number, items: BasketItem[]): Observable<void> {
    const dto = {
      clientId,
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
      })),
    };
    return this.http.post<void>(ApiEndpoints.ORDERS, dto);
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(ApiEndpoints.ORDERS);
  }
}
