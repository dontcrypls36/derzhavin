import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoodService } from '../../services/good.service';
import { PreOrderItem } from '../../models/pre-order-item';
import { Store } from '@ngrx/store';
import { PreOrder } from '../../models/pre-order';
import { ActionWithPayload } from '../../store/order-store';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-good-list',
  templateUrl: './good-list.component.html',
  styleUrls: ['./good-list.component.css']
})
export class GoodListComponent implements OnInit, AfterViewInit {


  public preOrderItems: PreOrderItem[] = [];

  categories: Category[] = [];

  constructor(private goodService: GoodService,
    private store: Store<PreOrder>,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.getRestOfGoods();
  }

  ngAfterViewInit(): void {
    console.log('I am ready');
  }

  getRestOfGoods() {
      this.goodService.getRestOfGoods().subscribe(res => {
        for (const good of res) {
          const preOrderItem = new PreOrderItem();
          preOrderItem.good = good;
          this.preOrderItems.push(preOrderItem);
        }
        this.getCategories();
      });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  showItemDialog() {

  }

  filterGoodsByGroup(groupId: string): PreOrderItem[] {
    let filtered = [];
    filtered = this.preOrderItems.filter(
       item => item.good.groupUuid === groupId);
    return filtered;
  }

  changeQuantPacking(item: PreOrderItem, delta: number) {
    if (item.quantPacking + delta < 0) {
      return false;
    }
    item.quantPacking = item.quantPacking + delta;
    item.quant = item.quantPacking * item.good.weight;
  }

  changeQuant(item: PreOrderItem, sign: number) {
    if (item.quant + item.good.weight * sign < 0) {
      return false;
    }
    item.quant = item.quant + item.good.weight * sign;
    item.quantPacking = item.quant / item.good.weight;
  }

  addItemToBucket(item: PreOrderItem) {
    this.store.dispatch<ActionWithPayload>({type: 'ADD_ITEM', payload: item});
  }

  public onQuantInputChange(event: any, item: PreOrderItem) {
    item.quantPacking = Math.round(event.target.value / item.good.weight);
    item.quant = item.quantPacking * item.good.weight;
  }

  public onQuantPackingInputChange(event: any, item: PreOrderItem) {
    item.quant = event.target.value * item.good.weight;
  }

}
