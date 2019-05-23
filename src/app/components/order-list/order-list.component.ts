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
    this.loadAll();
    this.orderService.getShippingSchedule().subscribe(res => {
      this.outletsItems = res.outletsItems;
    });
  }

  loadAll() {
    this.spinner.show();
    this.orderService.getOrders().subscribe( res => {
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

  loadOrdersWithFilters() {
    this.showContent = false;
    this.spinner.show();
    this.orderService.getOrders(this.selectedOutlet?this.selectedOutlet.uuid : null).subscribe(res => {
      this.orders = res.OrderItems;
      if (this.startDate) {
        this.orders = this.orders.filter(item => {
          let formatedShipDate = new Date(item.ShipDate);
          let formatedStartDate = new Date(this.startDate);
          return formatedShipDate >= formatedStartDate;
        });
      }
      if (this.endDate) {
        this.orders = this.orders.filter(item => {
          let formatedShipDate = new Date(item.ShipDate);
          let formatedEndDate = new Date(this.endDate);
          return formatedShipDate <= formatedEndDate;
        });
      }
      this.showContent = true;
      this.spinner.hide();
    });
  }

  onRowsCountChange(e : any) {
    this.rowsCount = e;
  }

}
