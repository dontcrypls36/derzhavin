import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShippingSchedule } from '../../models/shipping-schedule';
import { OrderService } from '../../services/order.service';
import { OutletsItem } from '../../models/outlets-item';

@Component({
  selector: 'app-order-confirmation-dialog',
  templateUrl: './order-confirmation-dialog.component.html',
  styleUrls: ['./order-confirmation-dialog.component.css']
})
export class OrderConfirmationDialogComponent implements OnInit {

  shippingSchedule: ShippingSchedule = new ShippingSchedule();
  deliveryTypes: string[] = ['Самовывоз', 'Курьером'];
  deliveryType = 'Самовывоз';
  selectedDate: string;
  selectedOutlet: OutletsItem;
  availableDates: string[];

  constructor(public dialogRef: MatDialogRef<OrderConfirmationDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: string,
  private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getShippingSchedule().subscribe(res => {
      this.shippingSchedule = res;
    });
  }

  onOk(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOutletChange() {
    let filtered = [];
    filtered = this.shippingSchedule.shippingScheduleItems.filter(
      item => item.routeUUID === this.selectedOutlet.routeId
    );
    this.availableDates = filtered;
  }

  isChecked(type: string): boolean {
    return type === 'Самовывоз';
  }

}
