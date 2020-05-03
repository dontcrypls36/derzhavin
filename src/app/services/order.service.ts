import { Injectable } from '@angular/core';
import { PreOrderItem } from '../models/pre-order-item';
import { PreOrder } from '../models/pre-order';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';
import { ShippingSchedule } from '../models/shipping-schedule';
import { OutletsItem } from '../models/outlets-item';
import { ShippingScheduleItem } from '../models/shipping-schedule-item';
import { PickupItem } from '../models/pickup-item';
import { OrderResponse } from '../models/order-response';
import {Constants} from "../models/constants";

@Injectable()
export class OrderService extends GlobalService<any> {

  constructor(private http: HttpClient) {
    super();
   }

   getHttp(): HttpClient {
    return this.http;
  }

  getRestPath(): string {
    return '';
  }

  mockCreds = {
    tel: '+79529516710',
    VersionApp: '1.2.1',
    DeviceDescr: 'GenymotionSamsung Galaxy S7 - 8.0 - API 26 - 1440x2560 SDK 26',
    pass: 'eaded9424b3f5b63',
    DeviceId: 'android'
  };

  addItemToOrder(item: PreOrderItem): Observable<PreOrder> {
    const preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    item.uuid = uuid();
    preOrder.preOrderItems.push(item);
    preOrder.itemCount++;
    preOrder.amount += item.good.price * item.quant;
    preOrder.weight += item.quant;
    preOrder.places += item.quantPacking;
    sessionStorage.setItem('preOrder', JSON.stringify(preOrder));
    return of(preOrder);
  }

  getOrderItems(): PreOrderItem[] {
    const preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    return preOrder.preOrderItems;
  }

  getPreOrder(): Observable<PreOrder> {
    const preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    return of(preOrder);
  }

  createPreOrder(): Observable<PreOrder> {
    let preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    if (preOrder === undefined || preOrder === null) {
        preOrder = new PreOrder();
        sessionStorage.setItem('preOrder', JSON.stringify(preOrder));
    }
    return of(preOrder);
  }

  deleteItemFromOrder(id: string): Observable<PreOrder> {
    const preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    let filtered = [];
    filtered = preOrder.preOrderItems.filter(
       o => o.uuid === id);
    const item = filtered[0];
    const index = preOrder.preOrderItems.indexOf(item);
    if (index > -1) {
      preOrder.preOrderItems.splice(index, 1);
      preOrder.itemCount--;
      preOrder.amount = preOrder.amount - item.good.price * item.quant;
      preOrder.weight -= item.quant;
      preOrder.places -= item.quantPacking;
      sessionStorage.setItem('preOrder', JSON.stringify(preOrder));
    }
    return of(preOrder);
  }

  setOrderItems(preOrder: PreOrder): Observable<PreOrder> {
    sessionStorage.removeItem('preOrder');
    sessionStorage.setItem('preOrder', JSON.stringify(preOrder));
    return of(preOrder);
  }

  cleanOrder() {
    const preOrder = JSON.parse(sessionStorage.getItem('preOrder'));
    preOrder.preOrderItems = [];
    preOrder.itemCount = 0;
    preOrder.amount = 0;
    preOrder.weight = 0;
    preOrder.places = 0;
    sessionStorage.setItem('preOrder', JSON.stringify(preOrder));
    return of(preOrder);
  }

  confirmOrder(order: Order): Observable<any> {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      user = this.mockCreds;
    }
    const body = {...Constants.body, ...order};
    return this.getHttp().post<any>('/api/v2/UpdateOrder', body)
    .pipe(map((item: any) => console.log(item)));
  }

  getShippingSchedule(): Observable<ShippingSchedule> {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      user = this.mockCreds;
    }
    return this.getHttp().post('/api/v2/GetShippingSchedule', Constants.body)
    .pipe(map((item: any) => this.parseSchedule(item)));
  }

  getOrders(outletId?: string): Observable<any> {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      user = Constants.body;
    }
    let body = user;
    if (outletId) {
      body = {...body, OutletUUID: outletId};
    }
    return this.getHttp().post('/api/v2/GetOrders', body)
    .pipe(map((item: any) => item));
  }


  parseSchedule(item: any): ShippingSchedule {
    const schedule = new ShippingSchedule();
    schedule.serverDate = item.ServerDate;
    schedule.outletsItems = this.parseOutletsItems(item.OutletsItems);
    schedule.shippingScheduleItems = this.parseShippingScheduleItems(item.ShippingScheduleItems);
    schedule.pickUpItems = this.parsePickUpItems(item.PickUpItems);
    return schedule;
  }

  parseOutletsItems(items: any): OutletsItem[] {
    const outletsItems = [];
    for (const item of items) {
      outletsItems.push(this.parseOutletsItem(item));
    }
    return outletsItems;
  }

  parseOutletsItem(item: any): OutletsItem {
    const outletsItem = new OutletsItem();
    outletsItem.uuid = item.OutletUUID;
    outletsItem.description = item.OutletDescription;
    outletsItem.routeId = item.OutletRouteUUID;
    outletsItem.routeDescription = item.OutletRouteDescription;
    return outletsItem;
  }

  parseShippingScheduleItems(items: any): ShippingScheduleItem[] {
    const schedules = [];
    for (const item of items) {
      schedules.push(this.parseShippingScheduleItem(item));
    }
    return schedules;
  }

  parseShippingScheduleItem(item: any): ShippingScheduleItem {
    const schedule = new ShippingScheduleItem();
    schedule.routeUUID = item.RouteUUID;
    schedule.shippingDate = item.ShippingDate;
    return schedule;
  }

  parsePickUpItems(items: any): PickupItem[] {
    const pickupItems = [];
    for (const item of items) {
      pickupItems.push(this.parsePickupItem(item));
    }
    return pickupItems;
  }

  parsePickupItem(item: any): PickupItem {
    const pickupItem = new PickupItem();
    pickupItem.pickupDate = item.PickUpDate;
    return pickupItem;
  }


}
