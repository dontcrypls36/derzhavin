import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {

  private _hidden = true;

  public show() {
    this._hidden = false;
  }

  public hide() {
    this._hidden = true;
  }


  get hidden(): boolean {
    return this._hidden;
  }

}
