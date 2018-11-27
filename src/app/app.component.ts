import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PreOrder } from './models/pre-order';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'derzhavin-app';

  constructor(private store: Store<PreOrder>) {}

}
