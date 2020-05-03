import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Good } from '../models/good';
import { map } from 'rxjs/operators';
import {Constants} from "../models/constants";

@Injectable({
  providedIn: 'root'
})
export class GoodService extends GlobalService<Good> {

  constructor(private http: HttpClient) {
    super();
   }

   getHttp(): HttpClient {
    return this.http;
  }

  getRestPath(): string {
    return '';
  }

  getRestOfGoods(): Observable<Good[]> {
    return this.getHttp().post<Good[]>('/api/v2/RestOfGoods', Constants.body)
      .pipe(map((items: any) => this.parseCollection(items)));
  }

  parseOne(item: any): Good {
    const good = new Good();
    good.uuid = item.UUID;
    good.category = item.GoodCatergory;
    good.categoryUuid = item.GoodCategoryUUID;
    good.brand = item.GoodBrand;
    good.code = item.GoodCode;
    good.description = item.GoodDescription;
    good.gostTu = item.GoodGostTu;
    good.group = item.GoodGroup;
    good.groupUuid = item.GoodGroupUUID;
    good.pictCount = item.GoodPictCount;
    good.packing = item.GoodPacking;
    good.rest = item.GoodRest;
    good.restQuant = item.GoodRestQuant;
    good.subGroup = item.GoodSubGroup;
    good.subGroupUuid = item.GoodSubGroupUUID;
    good.unit = item.GoodUnit;
    good.weight = item.GoodWeight;
    good.price = item.GoodsPrice;
    good.lastPrice = item.LastGoodPrice;
    good.lastQuant = item.LastGoodQuant;
    good.lastQuantPacking = item.LastGoodQuantPacking;
    good.lastOrderDate = item.LastOrderDate;
    good.promotionName = item.GoodPromotionName;
    good.promotionColor = item.GoodPromotionColor;
    good.hasCert = item.GoodHasCert;

    return good;
  }

  parseCollection(items: any): Good[] {
    const goods = [];
    for (const item of items.RestOfGoodsItems) {
      goods.push(this.parseOne(item));
    }
    return goods;
  }
}


