import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PreOrder } from './models/pre-order';
import { SpinnerServiceService } from './services/spinner-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpinnerServiceService]
})
export class AppComponent {
  title = 'derzhavin-app';

  constructor(private store: Store<PreOrder>, public spinnerService: SpinnerServiceService) {}

}
