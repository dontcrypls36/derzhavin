import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {GroupItem} from "../../models/group-item";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  onCategoryClick(category: string, event: any) {
    if (event.target.className === 'arrow') {
      return;
    }
    // this.showMenu = false;
    this.router.navigate(['/goods', category]);
  }

  onGroupClick(category: string, group: GroupItem) {
    // this.groupService.setCurrentGroup(group);
    // this.showMenu = false;
    this.router.navigate(['/goods', category], {fragment : 'uuid' + group.uuid});
  }

}
