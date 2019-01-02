import { Component, OnInit, Inject } from '@angular/core';
import { OrderResponse } from '../../models/order-response';
import { OrderItem } from '../../models/order-item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: OrderResponse;

  constructor(public dialogRef: MatDialogRef<OrderDetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: OrderResponse) { }

  ngOnInit() {
    this.order = this.data;
  }

  getGoodOrderInfo(uuid: string): string {
    let filtered: OrderItem[] = [];
    filtered = this.order.OrderGoodsItems.filter(
      item => item.GoodUUID === uuid
    );
    if (filtered.length === 0) {
      return '';
    } else {
      const good = filtered[0];
      return 'Заказано: ' + good.GoodQuant + good.GoodUnit + ' за ' + good.Summa;
    }
  }

}
