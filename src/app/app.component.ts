import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {PreOrder} from './models/pre-order';
import {SpinnerServiceService} from './services/spinner-service.service';
import {Router} from "@angular/router";
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpinnerServiceService]
})
export class AppComponent {
  route: string;
  title = 'derzhavin-app';
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  strokeWidth = 3;
  value = 100;

  constructor(private store: Store<PreOrder>, public spinnerService: SpinnerServiceService,
  private router: Router) {
    this.route = this.router.url;
  }

}
