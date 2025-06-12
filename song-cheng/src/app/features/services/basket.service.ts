import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BasketItem } from '../models/basket.model';

@Injectable({ providedIn: 'root' })
export class BasketFacadeService {
  private itemsSubject = new BehaviorSubject<BasketItem[]>([]);
  public items$ = this.itemsSubject.asObservable();
  public total$ = this.items$.pipe(
    map((items) =>
      items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
  );

  addItem(item: BasketItem) {
    const items = this.itemsSubject.value;
    const index = items.findIndex((i) => i.productId === item.productId);
    if (index !== -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.itemsSubject.next([...items]);
  }

  removeItem(productId: number) {
    const updated = this.itemsSubject.value.filter(
      (i) => i.productId !== productId
    );
    this.itemsSubject.next(updated);
  }

  clear() {
    this.itemsSubject.next([]);
  }

  getItems(): BasketItem[] {
    return this.itemsSubject.value;
  }

  getTotal(): number {
    return this.itemsSubject.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}
