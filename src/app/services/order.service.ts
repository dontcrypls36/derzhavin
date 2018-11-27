import { Injectable } from '@angular/core';
import { PreOrderItem } from '../models/pre-order-item';
import { PreOrder } from '../models/pre-order';
import { Observable, of } from 'rxjs';


@Injectable()
export class OrderService {

  preOrder: PreOrder;

  constructor() { }

  addItemToOrder(item: PreOrderItem): Observable<PreOrder> {
    this.preOrder.preOrderItems.push(item);
    return of(this.preOrder);
  }

  getOrderItems(): PreOrderItem[] {
    return this.preOrder.preOrderItems;
  }

  getPreOrder(): Observable<PreOrder> {
    if (this.preOrder === undefined) {
      this.preOrder = new PreOrder();
    }
    return of(this.preOrder);
  }

  deleteItemFromOrder(item: PreOrderItem): Observable<PreOrder> {
    const index = this.preOrder.preOrderItems.indexOf(item);
    if (index > -1) {
      this.preOrder.preOrderItems.splice(index, 1);
    }
    return of(this.preOrder);
  }
}
