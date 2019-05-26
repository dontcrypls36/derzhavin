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
  slicedOrders: OrderResponse[] = [];
  showContent = false;

  startDate: Date;
  endDate: Date;
  outletsItems: OutletsItem[] = [];
  selectedOutlet: OutletsItem;

  rowsCount = 10;

  rowsCountItems = [10, 20, 30];

  ru: any;

  constructor(private orderService: OrderService,
              private dialog: MatDialog,
              private spinner: SpinnerServiceService) { }

  ngOnInit() {
    this.ru = {
      firstDayOfWeek: 1,
      dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
      monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн","Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
      today: 'Сегодня',
      clear: 'Очистить',
      dateFormat: 'mm.dd.yy',
      weekHeader: 'Неделя'
    };
    this.loadAll();
    this.orderService.getShippingSchedule().subscribe(res => {
      this.outletsItems = res.outletsItems;
    });
  }

  loadAll() {
    this.spinner.show();
    this.orderService.getOrders().subscribe( res => {
      this.orders = res.OrderItems;
      this.slicedOrders = this.orders.slice(0, this.rowsCountItems[0]);
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
      this.slicedOrders = this.orders.slice(0, this.rowsCount);
      this.showContent = true;
      this.spinner.hide();
    });
  }

  onRowsCountChange(e : any) {
    this.slicedOrders = this.orders.slice(e.page * e.rows, (e.page + 1) * e.rows);
    this.rowsCount = e.rows;
  }

}
