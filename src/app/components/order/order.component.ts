import { Component, OnInit } from '@angular/core';
import { PreOrderItem } from '../../models/pre-order-item';
import { Store } from '@ngrx/store';
import { PreOrder } from '../../models/pre-order';
import { ActionWithPayload } from '../../store/order-store';
import { OkNoDialogComponent } from '../ok-no-dialog/ok-no-dialog/ok-no-dialog.component';
import { MatDialog } from '@angular/material';
import { OkNoDialogDataModel } from '../../models/ok-no-dialog-data-model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  preOrder: PreOrder;

  constructor(private store: Store<PreOrder>,
    private dialog: MatDialog) { }

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

  }

}
