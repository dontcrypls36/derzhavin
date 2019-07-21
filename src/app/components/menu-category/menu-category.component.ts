import {Component, ElementRef, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category";
import {Router} from "@angular/router";
import {GroupForMenuService} from "../../services/group-for-menu.service";
import {GroupItem} from "../../models/group-item";

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css'],
  host: {
    '(document:click)': 'onClick($event)'}
})
export class MenuCategoryComponent implements OnInit {

  private categories: Category[] = [];
  private collapsed: boolean[] = [];
  showMenu = false;

  downArrowHtml = 'fas fa-angle-double-down';
  upArrowHtml = 'fas fa-angle-double-up';

  constructor(
    private categoryService: CategoryService,
    private groupService: GroupForMenuService,
    private router: Router,
    private _eref: ElementRef
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
      for (let i = 0; i < this.categories.length; i++) {
        this.collapsed.push(false);
      }
    });
  }

  onClick(event) {
    if (event.target.id !== "menu" && !this._eref.nativeElement.contains(event.target) ) {// or some similar check
      this.showMenu = false;
    }
  }

  onCategoryClick(category: string, event: any) {
    if (event.target.className === 'arrow') {
      return;
    }
    this.showMenu = false;
    this.router.navigate(['/goods', category]);
  }

  onGroupClick(category: string, group: GroupItem) {
    // this.groupService.setCurrentGroup(group);
    this.showMenu = false;
    this.router.navigate(['/goods', category], {fragment : 'uuid' + group.uuid});
  }

  refreshCollapsed(i: number) {
    for (let j = 0; j < this.collapsed.length; j++) {
      if (i === j) {
        this.collapsed[j] = !this.collapsed[j];
      } else {
        this.collapsed[j] = false;
      }
    }
  }

  changeMenuVisibility() {
    this.showMenu = !this.showMenu;
  }

}
