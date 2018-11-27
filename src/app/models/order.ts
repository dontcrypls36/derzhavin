import { OrderItem } from './order-item';

export class Order {
  ClientUUID: string;
  DeviceId: string;
  VersionApp: string;
  UUID: string;
  Active: boolean;
  OutletUUID: string;
  OutletDescription: string;
  CreateDate: number;
  ShipDate: number;
  PickUp: boolean;
  Comment: string;
  StatusUpdate = 'New';
  Status: 'Создан';
  SourceCreate: 'site';
  TotalOrderSumma: number;
  TotalOrderQuant: number;
  OrderGoodsItems: OrderItem[] = [];
}
