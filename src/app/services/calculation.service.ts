import {Injectable} from '@angular/core';
import {GlobalService} from "./global.service";
import {HttpClient} from "@angular/common/http";
import {CalculationResponse} from "../models/calculation-response";
import {Observable} from "rxjs";
import {Good} from "../models/good";
import {map} from "rxjs/operators";
import {DocForAct} from "../models/doc-for-act";
import {Constants} from "../models/constants";

@Injectable({
  providedIn: 'root'
})
export class CalculationService extends GlobalService<CalculationResponse>{

  mockCreds = {
    tel: '+79529516710',
    VersionApp: '1.2.1',
    DeviceDescr: 'GenymotionSamsung Galaxy S7 - 8.0 - API 26 - 1440x2560 SDK 26',
    pass: 'eaded9424b3f5b63',
    DeviceId: 'android'
  };

  constructor(private http: HttpClient) {
    super();
  }


  protected getHttp(): HttpClient {
    return this.http;
  }

  protected getRestPath(): string {
    return '';
  }

  getCalculation(startDate: string, endDate: string): Observable<CalculationResponse> {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      user = Constants.body;
    }
    let body = {...user, DateFrom : startDate, Date : endDate};
    return this.getHttp().post<Good[]>('/api/v2/GetAkt', body)
      .pipe(map((items: any) => this.parseOne(items)));

  }

  parseOne(item: any): CalculationResponse {
    const calc = new CalculationResponse();
    calc.SettlementsSumma = item.SettlementsSumma;
    calc.SettlementsDate = item.SettlementsDate;
    calc.DocForAktItems = this.parseDocForAkts(item.DocForAktItems);
    return calc;
  }

  parseDocForAkts(items: any): DocForAct[] {
    const docs = [];
    for (const item of items) {
      const doc = new DocForAct();
      doc.Date = item.Date;
      doc.Active = item.Active;
      doc.ClientUUID = item.ClientUUID;
      doc.OrderUUID = item.OrderUUID;
      doc.created = item._created;
      doc.updated = item._updated;
      doc.version = item._version;
      doc.etag = item._etag;
      doc.Description = item.Description;
      doc.Credit = item.Credit;
      doc.Debit = item.Debit;
      docs.push(doc);
    }
    return docs;
  }

}
