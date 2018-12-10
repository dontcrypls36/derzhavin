import { OutletsItem } from './outlets-item';
import { ShippingScheduleItem } from './shipping-schedule-item';
import { PickupItem } from './pickup-item';

export class ShippingSchedule {
    serverDate: string;
    outletsItems: OutletsItem[] = [];
    shippingScheduleItems: ShippingScheduleItem[] = [];
    pickUpItems: PickupItem[] = [];
}
