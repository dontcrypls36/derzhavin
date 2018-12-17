import { Component, OnInit } from '@angular/core';
import { PreOrderItem } from '../../models/pre-order-item';
import { Store } from '@ngrx/store';
import { PreOrder } from '../../models/pre-order';
import { ActionWithPayload } from '../../store/order-store';
import { OkNoDialogComponent } from '../ok-no-dialog/ok-no-dialog.component';
import { MatDialog } from '@angular/material';
import { OkNoDialogDataModel } from '../../models/ok-no-dialog-data-model';
import { OrderConfirmationDialogComponent } from '../order-confirmation-dialog/order-confirmation-dialog.component';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { v4 as uuid } from 'uuid';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  preOrder: PreOrder;

  clientUUID = '82145abf-a324-11e4-bd31-001e671a3b56';
  clientDescription = 'Test user';

  constructor(private store: Store<PreOrder>,
    private dialog: MatDialog,
    private orderService: OrderService) { }

  ngOnInit() {
    this.store.select<PreOrder>('preOrder').subscribe(preOrder => {
      this.preOrder = preOrder;
    });
  }

  onOrderClean() {
    const data = new OkNoDialogDataModel();
    data.message = 'Очистить корзину?';
    data.okBtnText = 'Да';
    data.cancelBtnText = 'Нет';
    const dialogRef = this.dialog.open(OkNoDialogComponent,
      {
        data: data
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.store.dispatch<ActionWithPayload>({type: 'CLEAN_ORDER', payload: null});
    });
  }

  onItemDelete(item: PreOrderItem) {
    const data = new OkNoDialogDataModel();
    data.message = 'Удалить выбранную позицию?';
    data.okBtnText = 'Да';
    data.cancelBtnText = 'Нет';
    const dialogRef = this.dialog.open(OkNoDialogComponent,
      {
        data: data
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.store.dispatch<ActionWithPayload>({type: 'REMOVE_ITEM', payload: item.uuid});
    });
  }

  onOrderCreate() {
    const dialogRef = this.dialog.open(OrderConfirmationDialogComponent,
      {
        data: null
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const order = new Order();
        order.UUID = uuid();
        order.Comment = res.comment;
        order.CreateDate = new Date().toISOString();
        order.PickUp = res.outlet === null;
        order.ShipDate = res.date;
        // order.OutletUUID = res.outlet === null ? this.user.clientUUID : res.outlet.uuid;
        // order.OutletDescription =  res.outlet === null ? this.user.clientDescription : res.outlet.description;
        order.OutletUUID = res.outlet === null ? this.clientUUID : res.outlet.uuid;
        order.OutletDescription =  res.outlet === null ? this.clientDescription : res.outlet.description;
        order.TotalOrderSumma = this.preOrder.amount;
        order.TotalOrderQuant = this.getPreOrderQuant();
        order.OrderGoodsItems = this.createOrderItems();
        this.orderService.getAllOrders().subscribe(res2 =>
          console.log(res2));
        // this.orderService.confirmOrder(order).subscribe(res1 =>
        //   console.log(res1));
      }
    });

  }

  getPreOrderQuant(): number {
    let result = 0;
    this.preOrder.preOrderItems.map((item: PreOrderItem) => result = result + item.quant);
    return result;
  }

  createOrderItems(): OrderItem[] {
    const result = [];
    this.preOrder.preOrderItems.map((item: PreOrderItem) => {
      const orderItem = new OrderItem();
      orderItem.GoodQuant = item.quant;
      orderItem.GoodQuantPacking = item.quantPacking;
      orderItem.GoodUnit = item.good.unit;
      orderItem.GoodUUID = item.good.uuid;
      orderItem.Price = item.good.price;
      orderItem.Summa = item.good.price * item.quant;
      result.push(orderItem);
    });
    return result;
  }



}
