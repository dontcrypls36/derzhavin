import { Component, OnInit } from '@angular/core';
import { PreOrder } from '../../models/pre-order';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  preOrder: PreOrder;
  public orderItemCount = 0;

  constructor(private store: Store<PreOrder>) {
    this.store.dispatch({type: 'INIT_PRE_ORDER'});
   }

  ngOnInit() {
    this.store.select<PreOrder>('preOrder').subscribe(preOrder => {
      if (preOrder.preOrderItems === undefined) {
        return;
      }
      this.preOrder = preOrder;
      this.orderItemCount = preOrder.preOrderItems.length;
    });
  }
}
