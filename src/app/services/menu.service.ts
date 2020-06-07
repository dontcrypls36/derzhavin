import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  search = new Subject<string>();

  constructor() { }

  getSearch(): Observable<string> {
    return this.search.asObservable();
  }

  setSearch(str: string) {
    this.search.next(str);
  }
}
