import { Component, OnInit } from '@angular/core';
import { GoodService } from '../../services/good.service';
import { PreOrderItem } from '../../models/pre-order-item';
import { Store } from '@ngrx/store';
import { PreOrder } from '../../models/pre-order';
import { ActionWithPayload } from '../../store/order-store';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { SpinnerServiceService } from '../../services/spinner-service.service';
import { GoodDetailsComponent } from '../good-details/good-details.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-good-list',
  templateUrl: './good-list.component.html',
  styleUrls: ['./good-list.component.css']
})
export class GoodListComponent implements OnInit {


  public preOrderItems: PreOrderItem[] = [];

  categories: Category[] = [];

  constructor(private goodService: GoodService,
    private store: Store<PreOrder>,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private spinner: SpinnerServiceService) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.spinner.show();
    let goods, categories;
    try {
      await Promise.all([
        ( async () => goods =  await this.goodService.getRestOfGoods().toPromise())(),
        ( async () => categories = await this.categoryService.getCategories().toPromise())()
      ]);
      for (const good of goods) {
          const preOrderItem = new PreOrderItem();
          preOrderItem.good = good;
          this.preOrderItems.push(preOrderItem);
      }
      this.categories = categories;
    } finally {
      this.spinner.hide();
    }
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

  showItemDialog(event: any, item: PreOrderItem) {
    if (event.target.localName !== 'div') {
      return false;
    }
    this.dialog.open(GoodDetailsComponent,
      {
        data: item
      }
    );

    // dialogRef.afterClosed().subscribe(res => {
    //   if (!res) {
    //     return;
    //   }
    //   this.store.dispatch<ActionWithPayload>({type: 'CLEAN_ORDER', payload: null});
    // });
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
    item.quantPacking = Math.round(event.newValue / item.good.weight);
    item.quant = item.quantPacking * item.good.weight;
  }

  public onQuantPackingInputChange(event: any, item: PreOrderItem) {
    item.quant = event.newValue * item.good.weight;
  }

}
