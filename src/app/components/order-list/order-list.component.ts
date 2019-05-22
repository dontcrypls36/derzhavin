import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {OrderResponse} from '../../models/order-response';
import {MatDialog} from '@angular/material';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {SpinnerServiceService} from '../../services/spinner-service.service';
import {OutletsItem} from "../../models/outlets-item";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: OrderResponse[] = [];
  showContent = false;

  startDate: Date;
  endDate: Date;
  outletsItems: OutletsItem[] = [];
  selectedOutlet: OutletsItem;

  rowsCount = {num: 15};

  rowsCountItems = [{num:5}, {num:10}, {num:15}, {num:20}];

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
      this.showContent = true;
      this.spinner.hide();
    });
  }

  showOrderDetails(order: OrderResponse) {
    if (order.TotalFactQuant <= 0) {
      return;
    }
    this.dialog.open(OrderDetailsComponent,
      {
        data: order
      });
  }

  loadOrders() {

  }

  onRowsCountChange(e : any) {
    this.rowsCount = e;
  }

}
