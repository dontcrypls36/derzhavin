import {Component, OnInit, ViewChild} from '@angular/core';
import {PreOrder} from '../../models/pre-order';
import {Store} from '@ngrx/store';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {Router} from '@angular/router';
import {MenuCategoryComponent} from "../menu-category/menu-category.component";
import {Good} from "../../models/good";
import {GoodService} from "../../services/good.service";
import {PreOrderItem} from "../../models/pre-order-item";
import {GoodDetailsComponent} from "../good-details/good-details.component";
import {MatDialog} from "@angular/material";
import {ProfileMenuComponent} from "../profile-menu/profile-menu.component";
import {RegInfoRequest} from "../../models/reg-info-request";
import {SmsService} from "../../services/sms.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  private readonly APP_ID = 'atxo6sen';

  preOrder: PreOrder;
  public orderItemCount = 0;
  orderAmount = 0;
  categories: Category[] = [];
  filteredGoods: Good[] = [];
  selectedGood: Good;
  isListOpen = false;
  active = false;

  username: string;
  user: User;

  @ViewChild(MenuCategoryComponent) menu: MenuCategoryComponent;
  @ViewChild(ProfileMenuComponent) profileMenu: ProfileMenuComponent;

  constructor(private store: Store<PreOrder>,
              private categoryService: CategoryService,
              private router: Router,
              private goodsService: GoodService,
              private dialog: MatDialog,
              private smsService: SmsService) {
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
    this.goodsService.getRestOfGoods().subscribe(res => {
      this.filteredGoods = res;
    });
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.smsService.register(new RegInfoRequest(user.tel, user.password, "")).subscribe( res => {
      this.username = res.ClientDescription;
        (<any>window).Intercom('boot', {
          app_id: this.APP_ID,
          name: this.username,
          phone: user.tel,
          custom_launcher_selector:'#custom_intercom_launcher',
          hide_default_launcher: true
          // vertical_padding: 60,
          // horizontal_padding: 60
          //Website visitor so may not have any user related info
        });
    });
  }

  isAuthorized(): boolean{
    return true;
    // return sessionStorage.getItem('user') !== null;
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

  customSearchFn(event) {
    if (!event.term || event.term.length < 3) {
      this.isListOpen = false;
      return false;
    } else {
      this.isListOpen = true;
      return event.item.description.toLowerCase().indexOf(event.term.toLowerCase()) > -1;
    }
  }

  onSelect() {
    this.isListOpen = false;
    if (this.selectedGood) {
      let preOrderItem = new PreOrderItem();
      preOrderItem.good = this.selectedGood;
      this.showItemDialog(preOrderItem);
    }
    this.selectedGood = null;
  }

  showItemDialog(item: PreOrderItem) {
    this.dialog.open(GoodDetailsComponent,
      {
        width: '1190px',
        data: item
      }
    );
  }

  onSettingsClick() {
    this.profileMenu.changeVisibility();
  }

  onSearchInputChange(event:any) {
    let searchStr = event.target.value;
    if (searchStr.length >= 3) {

    }
  }
}
