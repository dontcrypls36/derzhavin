import {Component, Inject, OnInit} from '@angular/core';
import {OrderResponse} from '../../models/order-response';
import {OrderItem} from '../../models/order-item';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {PreOrderItem} from "../../models/pre-order-item";
import {GoodDetailsComponent} from "../good-details/good-details.component";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: OrderResponse;

  constructor(public dialogRef: MatDialogRef<OrderDetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: OrderResponse,
              private dialog: MatDialog) { }

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
      return good.GoodQuant + good.GoodUnit + ' за ' + good.Summa;
    }
  }

  getGoodOrderSumma(uuid: string): string {
    let filtered: OrderItem[] = [];
    filtered = this.order.OrderGoodsItems.filter(
      item => item.GoodUUID === uuid
    );
    if (filtered.length === 0) {
      return '';
    } else {
      const good = filtered[0];
      return '' + good.Summa;
    }
  }

  getGoodOrderQuant(uuid: string): string {
    let filtered: OrderItem[] = [];
    filtered = this.order.OrderGoodsItems.filter(
      item => item.GoodUUID === uuid
    );
    if (filtered.length === 0) {
      return '';
    } else {
      const good = filtered[0];
      return good.GoodQuant + good.GoodUnit;
    }
  }

  getGoodOrderQuantPacking(uuid: string): string {
    let filtered: OrderItem[] = [];
    filtered = this.order.OrderGoodsItems.filter(
      item => item.GoodUUID === uuid
    );
    if (filtered.length === 0) {
      return '';
    } else {
      const good = filtered[0];
      return good.GoodQuantPacking + 'шт';
    }
  }

  showItemDialog(event: any, item: PreOrderItem) {
    this.dialog.open(GoodDetailsComponent,
      {
        width: '1190px',
        data: item
      }
    );

    // dialogRef.afterClosed().subscribe(res => {
    //   if (!res) {
    //     return;
    //   }
    //   this.store.dispatch<ActionWithPayload>({type: 'CLEAN_ORDER', payload: null});
    // });
  }

}
