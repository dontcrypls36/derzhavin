import {Component, Inject, OnInit} from '@angular/core';
import {OrderResponse} from '../../models/order-response';
import {OrderItem} from '../../models/order-item';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {PreOrderItem} from "../../models/pre-order-item";
import {GoodDetailsComponent} from "../good-details/good-details.component";
import {GoodService} from "../../services/good.service";
import {Good} from "../../models/good";
import {Store} from "@ngrx/store";
import {PreOrder} from "../../models/pre-order";
import {ActionWithPayload} from "../../store/order-store";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: OrderResponse;

  goods: Good[] = [];

  constructor(public dialogRef: MatDialogRef<OrderDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OrderResponse,
              private dialog: MatDialog,
              private goodService: GoodService,
              private store: Store<PreOrder>) {
  }

  ngOnInit() {
    this.order = this.data;
    let allGoodIds = this.order.FactOrderGoodsItems.map(item => item.GoodUUID);
    this.goodService.getRestOfGoods(allGoodIds).subscribe( res => {
      this.goods = res;
    });
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

  showItemDialog(event: any, goodId: string) {
    let preOrderItem = new PreOrderItem();
    preOrderItem.good = this.goods.filter(good => good.uuid === goodId)[0];
    if (preOrderItem.good) {
      this.dialogRef.close();
      this.dialog.open(GoodDetailsComponent,
        {
          width: '1190px',
          data: preOrderItem
        });
    }
  }

  getRestExpression(id: string) {
    let good: Good = this.goods.filter(g => g.uuid === id)[0];
    if (good) {
      return ' ' + (good.restQuant > good.greaterOrEqualRest ? '> ' + good.greaterOrEqualRest : good.restQuant) + good.unit;
    } else {
      return ' нет';
    }
  }

  onOrderRepeat() {
    let allGoodIds = this.order.FactOrderGoodsItems.map(item => item.GoodUUID);
    let rests: Good[] = [];
    this.goodService.getRestOfGoods(allGoodIds).subscribe( res => {
      rests = res;
      for (const orderGood of this.order.OrderGoodsItems) {
        let filtered: Good[] = [];
        filtered = rests.filter(item => item.uuid === orderGood.GoodUUID);
        if (filtered.length > 0) {
          const good = filtered[0];
          let preOrderItem = new PreOrderItem();
          preOrderItem.good = good;
          preOrderItem.quant = good.restQuant >= orderGood.GoodQuant ? orderGood.GoodQuant : good.restQuant;
          preOrderItem.quantPacking = preOrderItem.quant / good.weight;
          this.store.dispatch<ActionWithPayload>({type: 'ADD_ITEM', payload: preOrderItem});
        }
      }
    });


  }
}

