import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../models/order-response';
import { MatDialog } from '@angular/material';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: OrderResponse[] = [];

  constructor(private orderService: OrderService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe( res => {
       this.orders = res.OrderItems;
    });
  }

  showOrderDetails(order: OrderResponse) {
    this.dialog.open(OrderDetailsComponent, {data: order});
  }

}
