import { OrderItem } from './order-item';

export class Order {
  ClientUUID: string;
  DeviceId: string;
  VersionApp: string;
  UUID: string;
  Active = true;
  OutletUUID: string;
  OutletDescription: string;
  CreateDate: string;
  ShipDate: string;
  PickUp: boolean;
  Comment: string;
  StatusUpdate = 'New';
  Status = 'Создан';
  SourceCreate = 'site';
  TotalOrderSumma: number;
  TotalOrderQuant: number;
  OrderGoodsItems: OrderItem[] = [];
}
