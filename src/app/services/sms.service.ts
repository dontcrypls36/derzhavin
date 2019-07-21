import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegInfoRequest} from "../models/reg-info-request";
import sha256 from "sha256";

@Injectable({
  providedIn: 'root'
})
export class SmsService extends GlobalService<any> {

  private salt = '84732622333';

  constructor(private http: HttpClient) {
    super();
   }

  public sendSms(phoneNumber: string): Observable<any> {
    const hash = sha256(phoneNumber + '.' + this.salt);
    const body = {
      tel: phoneNumber,
      DeviceId: '1234',
      DeviceDescr: 'Browser',
      VersionApp: 'Web',
      hash: hash
    };
      return this.http.post<string>('/api/v2/' + this.getRestPath(), body);
  }

  getRestPath(): string {
    return 'RequestSMS';
  }

  getHttp(): HttpClient {
    return this.http;
  }

  register(regInfoRequest: RegInfoRequest): Observable<any> {
    return this.http.post<any>('/api/v2/RegInfoClient', regInfoRequest);
  }
}
