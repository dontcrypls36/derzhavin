import {Component, OnInit, ViewChild} from '@angular/core';
import {PreOrder} from '../../models/pre-order';
import {Store} from '@ngrx/store';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {Router} from '@angular/router';
import {MenuCategoryComponent} from "../menu-category/menu-category.component";

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  preOrder: PreOrder;
  public orderItemCount = 0;
  orderAmount = 0;
  categories: Category[] = [];
  showMenu: boolean = false;

  @ViewChild(MenuCategoryComponent) menu: MenuCategoryComponent;

  constructor(private store: Store<PreOrder>,
    private categoryService: CategoryService,
              private router: Router) {
    this.store.dispatch({type: 'INIT_PRE_ORDER'});
   }

  ngOnInit() {
    this.store.select<PreOrder>('preOrder').subscribe(preOrder => {
      if (preOrder.preOrderItems === undefined) {
        return;
      }
      this.preOrder = preOrder;
      this.orderItemCount = preOrder.itemCount;
      this.orderAmount = preOrder.amount;
    });
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  onAnchorClick(tag: string) {
  // if (this.router.url.includes('good-list')) {
  //   const x = document.querySelector('#uuid' + tag);
  //   if (x) {
  //     x.scrollIntoView();
  //   }
  // } else {
    this.router.navigate(['/goods', tag]);
  // }

  }

  calculateOrderAmount(): number {
    let result = 0;
    for (const item of this.preOrder.preOrderItems) {
      result = result + item.good.price * item.quant;
    }
    return result;
  }

  onCatalogClick() {
    this.menu.changeMenuVisibility();
  }
}
