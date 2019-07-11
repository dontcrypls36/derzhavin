import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService extends GlobalService<any> {

  constructor(private http: HttpClient) {
    super();
   }

  public sendSms(phoneNumber: string): Observable<string> {
    // let params = new HttpParams();
    // params = params.append('tel', phoneNumber)
    //   .append('DeviceId', '')
    //   .append('DeviceDescr', 'Browser')
    //   .append('VersionApp', 'Web')
    //   .append('hash', 'E56D6E378CA2502CFEDC2CFD2BF4F0611AFFA61F');
    // const hash = Md5.hashStr(phoneNumber + '.747320622233');
    const hash = '458ae85baf9a8edac01d262f2d87e52a0130fd4c';
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
}
