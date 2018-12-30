import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PreOrderItem } from '../../models/pre-order-item';
import { ActionWithPayload } from '../../store/order-store';
import { Store } from '@ngrx/store';
import { PreOrder } from '../../models/pre-order';

@Component({
  selector: 'app-good-details',
  templateUrl: './good-details.component.html',
  styleUrls: ['./good-details.component.css']
})
export class GoodDetailsComponent implements OnInit {

  item: PreOrderItem = new PreOrderItem();

  constructor(public dialogRef: MatDialogRef<GoodDetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private store: Store<PreOrder>) { }

  ngOnInit() {
    this.mapItem();
  }


  onCancel() {
    this.dialogRef.close(false);
  }

  changeQuantPacking(item: PreOrderItem, delta: number) {
    if (item.quantPacking + delta < 0) {
      return false;
    }
    item.quantPacking = item.quantPacking + delta;
    item.quant = item.quantPacking * item.good.weight;
  }

  changeQuant(item: PreOrderItem, sign: number) {
    if (item.quant + item.good.weight * sign < 0) {
      return false;
    }
    item.quant = item.quant + item.good.weight * sign;
    item.quantPacking = item.quant / item.good.weight;
  }

  addItemToBucket(item: PreOrderItem) {
    this.store.dispatch<ActionWithPayload>({type: 'ADD_ITEM', payload: item});
  }

  onQuantInputChange(event: any, item: PreOrderItem) {
    item.quantPacking = Math.round(event.newValue / item.good.weight);
    item.quant = item.quantPacking * item.good.weight;
  }

  onQuantPackingInputChange(event: any, item: PreOrderItem) {
    item.quant = event.newValue * item.good.weight;
  }

  mapItem() {
    this.item.good = this.data.good;
  }

  getRest(): string {
    const rest = (this.item.good.restQuant > this.item.good.greaterOrEqualRest) ? '> 100' : this.item.good.restQuant.toString();
    return rest + ' ' + this.item.good.unit + ' на складе';
  }

  getPriceDelta(): number {
    return this.item.good.price - this.item.good.lastPrice;
  }

  getDeltaClass(): string {
    const delta = this.getPriceDelta();
    if (delta > 0) {
      return 'positive';
    }
    if (delta < 0) {
      return 'negative';
    }
    return '';
  }
}
