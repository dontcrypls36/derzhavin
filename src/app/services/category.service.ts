import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupItem } from '../models/group-item';
import {Constants} from "../models/constants";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends GlobalService<Category> {
  protected getHttp(): HttpClient {
    return this.http;
  }
  protected getRestPath(): string {
    return '/api/v2/';
  }

  constructor(private http: HttpClient) {
    super();
   }

   getCategories(): Observable<Category[]> {
     //todo использовать реального юзера
     let user = JSON.parse(sessionStorage.getItem('user'));
     return this.getHttp().post<Category[]>(this.getRestPath() + 'CategoryGoods', Constants.body)
     .pipe(map((item: any) => this.parseCollection(item.CategoryItems)));
   }

   parseCollection(items: any): Category[] {
    const categories = [];
    for (const item of items) {
      categories.push(this.parseOne(item));
    }
    return categories;
   }

   parseOne(item: any): Category {
      const category = new Category();
      category.uuid = item.CategoryUUID;
      category.descr = item.CategoryDescr;
      category.count = item.CategoryCount;
      category.groups = this.parseGroupItemCollection(item.GroupItems);
      return category;
   }

   parseGroupItem(item: any): GroupItem {
     const groupItem = new GroupItem();
     groupItem.uuid = item.GroupUUID;
     groupItem.descr = item.GroupDescr;
     groupItem.count = item.GroupCount;
     return groupItem;
   }

   parseGroupItemCollection(items: any): GroupItem[] {
    const groupItems = [];
    for (const item of items) {
      groupItems.push(this.parseGroupItem(item));
    }
    return groupItems;
   }
}
