import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../models/order-response';
import { MatDialog } from '@angular/material';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { SpinnerServiceService } from '../../services/spinner-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: OrderResponse[] = [];

  constructor(private orderService: OrderService,
              private dialog: MatDialog,
              private spinner: SpinnerServiceService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.spinner.show();
    this.orderService.getAllOrders().subscribe( res => {
      this.orders = res.OrderItems;
      this.spinner.hide();
    });
  }

  showOrderDetails(order: OrderResponse) {
    this.dialog.open(OrderDetailsComponent, {data: order});
  }

}
