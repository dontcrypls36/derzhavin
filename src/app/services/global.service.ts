import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class GlobalService<T> {

  private _url =  environment.rest_path;

  constructor() { }

  protected get url(): string {
    return this._url;
  }

  protected abstract getHttp(): HttpClient;

  protected abstract getRestPath(): string;

}
