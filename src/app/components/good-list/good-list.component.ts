import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {GoodService} from '../../services/good.service';
import {PreOrderItem} from '../../models/pre-order-item';
import {Store} from '@ngrx/store';
import {PreOrder} from '../../models/pre-order';
import {ActionWithPayload} from '../../store/order-store';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {SpinnerServiceService} from '../../services/spinner-service.service';
import {GoodDetailsComponent} from '../good-details/good-details.component';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from "@angular/router";
import {GroupForMenuService} from "../../services/group-for-menu.service";

@Component({
  selector: 'app-good-list',
  templateUrl: './good-list.component.html',
  styleUrls: ['./good-list.component.css']
})
export class GoodListComponent implements OnInit, AfterViewChecked {

  public preOrderItems: PreOrderItem[] = [];
  private filter: string;
  private group: string;
  private category: Category = new Category();
  private groupFragment: string;

  categories: Category[] = [];

  constructor(private goodService: GoodService,
    private store: Store<PreOrder>,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private spinner: SpinnerServiceService, private route: ActivatedRoute,
              private groupService: GroupForMenuService) {
    this.route.params.subscribe(params => {
      this.filter = params.category;
      if (this.categories.length !== 0) {
        this.category = this.categories.filter(item => item.uuid === this.filter)[0];
        this.route.fragment.subscribe(fr => {
          if (fr) {
            this.groupFragment = fr;
          }
        });
      }
    });

  }

  ngAfterViewChecked(): void {
    this.route.fragment.subscribe(fr => {
      if (fr) {
        this.groupFragment = fr;
      }
    });
    let x = document.getElementById(this.groupFragment);
    if (x) {
      x.scrollIntoView();
      let y = window.screenY;
      window.scrollBy(0, y - 60);
      this.groupFragment = null;
    }
  }

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
      this.category = this.categories.filter(item => item.uuid === this.filter)[0];
      const x = document.querySelector(this.group);
      if (x) {
        x.scrollIntoView();
      }
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
    this.dialog.open(GoodDetailsComponent,
      {
        width: '1190px',
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
