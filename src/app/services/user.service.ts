import {Injectable} from '@angular/core';
import {GlobalService} from "./global.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalService<any>{

  constructor(private http: HttpClient) {
    super();
  }
  getHttp(): HttpClient {
    return this.http;
  }

  getRestPath(): string {
    return '';
  }

  login(phoneNumber: string, pass: string): Observable<any> {
    return of(null);
  }



}
