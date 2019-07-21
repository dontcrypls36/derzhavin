import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GroupItem} from '../models/group-item';

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
     const body = {
        tel: '+79529516710',
        VersionApp: '1.2.1',
        DeviceDescr: 'GenymotionSamsung Galaxy S7 - 8.0 - API 26 - 1440x2560 SDK 26',
        pass: 'eaded9424b3f5b63',
        DeviceId: 'android'
    };
     let user = JSON.parse(sessionStorage.getItem('user'));
     return this.getHttp().post<Category[]>(this.getRestPath() + 'CategoryGoods', user)
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
