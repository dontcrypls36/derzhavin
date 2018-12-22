import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../models/order-response';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: OrderResponse[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe( res => {
       this.orders = res.OrderItems;
    });
  }

}
