import { Component, OnInit } from '@angular/core';
import { PreOrderItem } from '../../models/pre-order-item';
import { Store } from '@ngrx/store';
import { PreOrder } from '../../models/pre-order';
import { ActionWithPayload } from '../../store/order-store';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  preOrder: PreOrder;

  constructor(private store: Store<PreOrder>) { }

  ngOnInit() {
    this.store.select<PreOrder>('preOrder').subscribe(preOrder => {
      this.preOrder = preOrder;
    });
  }

  onOrderClean() {
    this.store.dispatch<ActionWithPayload>({type: 'CLEAN_ORDER', payload: null});
  }

  onItemDelete(item: PreOrderItem) {
    this.store.dispatch<ActionWithPayload>({type: 'REMOVE_ITEM', payload: item.uuid});
  }

  onOrderCreate() {

  }

}
