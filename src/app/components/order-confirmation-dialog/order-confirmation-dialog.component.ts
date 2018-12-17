import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, SELECT_ITEM_HEIGHT_EM } from '@angular/material';
import { ShippingSchedule } from '../../models/shipping-schedule';
import { OrderService } from '../../services/order.service';
import { OutletsItem } from '../../models/outlets-item';
import { DateFormatService } from '../../services/date-format.service';
import { PickupItem } from '../../models/pickup-item';
import {SelectItem} from 'primeng/api';
import { ShippingScheduleItem } from '../../models/shipping-schedule-item';
import { OrderRequest } from '../../models/order-request';

@Component({
  selector: 'app-order-confirmation-dialog',
  templateUrl: './order-confirmation-dialog.component.html',
  styleUrls: ['./order-confirmation-dialog.component.css']
})
export class OrderConfirmationDialogComponent implements OnInit {

  shippingSchedule: ShippingSchedule = new ShippingSchedule();
  deliveryTypes: string[] = ['Самовывоз', 'Курьером'];
  deliveryType = 'Самовывоз';
  selectedDate: PickupItem = null;
  selectedOutlet: OutletsItem;
  courierDates: SelectItem[] = [];
  pickupDates: SelectItem[] = [];
  comment: string;

  constructor(public dialogRef: MatDialogRef<OrderConfirmationDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: string,
  private orderService: OrderService,
  private dateFormatter: DateFormatService) { }

  ngOnInit() {
    this.orderService.getShippingSchedule().subscribe(res => {
      this.shippingSchedule = res;
      this.shippingSchedule.pickUpItems.map(
        (item: PickupItem) => {
          const select = {
            label: this.dateFormatter.format(item.pickupDate, DateFormatService.DATE),
            value: item
          };
          this.pickupDates.push(select);
        });
    });
  }

  onOk(): void {
    const res = new OrderRequest();
    res.comment = this.comment;
    res.date = this.selectedDate.pickupDate;
    res.outlet = this.deliveryType === 'Самовывоз' ? null : this.selectedOutlet;
    this.dialogRef.close(res);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOutletChange() {
    let filtered = [];
    this.selectedDate = null;
    filtered = this.shippingSchedule.shippingScheduleItems.filter(
      item => item.routeUUID === this.selectedOutlet.routeId
    );
    filtered.map(
      (item: ShippingScheduleItem) => {
        const select = {
            label: this.dateFormatter.format(item.shippingDate, DateFormatService.DATE),
            value: item
          };
        this.courierDates.push(select);
      });
    }

    isConfirmDisabled() {
      return this.selectedDate === null || this.comment === undefined || this.comment.length === 0;
    }

    onDeliveryTypeChange() {
      this.selectedDate = null;
    }
}
