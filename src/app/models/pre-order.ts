import { PreOrderItem } from './pre-order-item';

export class PreOrder {
    preOrderItems: PreOrderItem[] = [];
    itemCount = 0;
    amount = 0;

    public calculateChars() {
        this.preOrderItems.map( item => {
            this.itemCount++;
            this.amount = item.quantPacking * item.good.price;
        });
    }
}

