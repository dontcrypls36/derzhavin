import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopNavBarComponent} from './components/top-nav-bar/top-nav-bar.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {GoodListComponent} from './components/good-list/good-list.component';
import {GoodDetailsComponent} from './components/good-details/good-details.component';
import {OrderComponent} from './components/order/order.component';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {OrderService} from './services/order.service';
import {StoreModule} from '@ngrx/store';
import {itemCounterReducer, PreOrderEffects, preOrderReducer} from './store/order-store';
import {EffectsModule} from '@ngrx/effects';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {OkNoDialogComponent} from './components/ok-no-dialog/ok-no-dialog.component';
import {OrderConfirmationDialogComponent} from './components/order-confirmation-dialog/order-confirmation-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {DropdownModule} from 'primeng/dropdown';
import {DatePipe, registerLocaleData} from '@angular/common';
import {OrderListComponent} from './components/order-list/order-list.component';
import {NewsComponent} from './components/news/news.component';
import {CalculationsComponent} from './components/calculations/calculations.component';
import localeRu from '@angular/common/locales/ru';
import {QuantityChangerComponent} from './components/quantity-changer/quantity-changer.component';
import {OrderDetailsComponent} from './components/order-details/order-details.component';
import {MenuCategoryComponent} from './components/menu-category/menu-category.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {TableModule} from "primeng/table";
import {CalendarModule, CarouselModule, InputMaskModule, PaginatorModule} from "primeng/primeng";
import {AnalogsComponent} from './components/analogs/analogs.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {LoggerGuard} from "./models/logger-guard";
import {ProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {ProfileComponent} from './components/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'goods/:category', component: GoodListComponent, canActivate: [LoggerGuard] },
  { path: 'order', component: OrderComponent, canActivate: [LoggerGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [LoggerGuard] },
  { path: 'calculations', component: CalculationsComponent, canActivate: [LoggerGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent}
];

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    LoginComponent,
    RegistrationComponent,
    GoodListComponent,
    GoodDetailsComponent,
    OrderComponent,
    OkNoDialogComponent,
    OrderConfirmationDialogComponent,
    OrderListComponent,
    NewsComponent,
    CalculationsComponent,
    QuantityChangerComponent,
    OrderDetailsComponent,
    MenuCategoryComponent,
    AnalogsComponent,
    ProfileMenuComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    DropdownModule,
    BrowserAnimationsModule,
    TableModule,
    PaginatorModule,
    CalendarModule,
    CarouselModule,
    NgSelectModule,
    InputMaskModule,
    ScrollToModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true,
      anchorScrolling: 'enabled'} // <-- debugging purposes only
    ),
    StoreModule.forRoot({ itemCounter: itemCounterReducer, preOrder: preOrderReducer}),
    EffectsModule.forRoot([PreOrderEffects]),
    CollapseModule.forRoot()
  ],
  providers: [OrderService, DatePipe, {provide: LOCALE_ID, useValue: 'ru'}, LoggerGuard],
  bootstrap: [AppComponent],
  entryComponents: [OkNoDialogComponent, OrderConfirmationDialogComponent, GoodDetailsComponent, OrderDetailsComponent]
})
export class AppModule { }
