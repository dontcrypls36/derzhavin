import {OrderItem} from './order-item';
import {Good} from "./good";

export class OrderResponse {
    UUID: string;
    etag: string;
    OutletUUID: string;
    OutletDescription: string;
    CreateDate: string;
    ShipDate: string;
    PickUp: boolean;
    Comment: string;
    Number: number;
    Status: string;
    SourceCreate: string;
    TotalOrderSumma: number;
    TotalFactSumma: number;
    TotalOrderQuant: number;
    TotalFactQuant: number;
    OrderGoodsItems: OrderItem[] = [];
    FactOrderGoodsItems: OrderItem[] = [];
    goods: Good[] = [];
}
