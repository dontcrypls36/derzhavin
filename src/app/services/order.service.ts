import { Injectable } from '@angular/core';
import { PreOrderItem } from '../models/pre-order-item';
import { PreOrder } from '../models/pre-order';
import { Observable, of } from 'rxjs';


@Injectable()
export class OrderService {

  constructor() { }

  addItemToOrder(item: PreOrderItem): Observable<PreOrder> {
    const preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    preOrder.preOrderItems.push(item);
    preOrder.itemCount++;
    preOrder.amount = preOrder.amount + item.good.price * item.quant;
    sessionStorage.setItem('preOrder', JSON.stringify(preOrder));
    return of(preOrder);
  }

  getOrderItems(): PreOrderItem[] {
    const preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    return preOrder.preOrderItems;
  }

  getPreOrder(): Observable<PreOrder> {
    const preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    return of(preOrder);
  }

  createPreOrder(): Observable<PreOrder> {
    let preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    if (preOrder === undefined || preOrder === null) {
        preOrder = new PreOrder();
        sessionStorage.setItem('preOrder', JSON.stringify(preOrder));
    }
    return of(preOrder);
  }

  deleteItemFromOrder(item: PreOrderItem): Observable<PreOrder> {
    const preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    const index = preOrder.preOrderItems.indexOf(item);
    if (index > -1) {
      preOrder.preOrderItems.splice(index, 1);
      preOrder.itemCount--;
      preOrder.amount = preOrder.amount - item.good.price * item.quant;
      sessionStorage.setItem('preOrder', JSON.stringify(preOrder));
    }
    return of(preOrder);
  }
}
