import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { GoodListComponent } from './components/good-list/good-list.component';
import { GoodDetailsComponent } from './components/good-details/good-details.component';
import { OrderComponent } from './components/order/order.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { OrderService } from './services/order.service';
import { StoreModule } from '@ngrx/store';
import { itemCounterReducer, PreOrderEffects, preOrderReducer } from './store/order-store';
import { EffectsModule } from '@ngrx/effects';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { OkNoDialogComponent } from './components/ok-no-dialog/ok-no-dialog.component';
import { MatDialogModule } from '@angular/material';
import { OrderConfirmationDialogComponent } from './components/order-confirmation-dialog/order-confirmation-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { DropdownModule } from 'primeng/dropdown';
import { DatePipe } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NewsComponent } from './components/news/news.component';
import { CalculationsComponent } from './components/calculations/calculations.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

const appRoutes: Routes = [
  { path: 'good-list', component: GoodListComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order-list', component: OrderListComponent }
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
    CalculationsComponent
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
    DropdownModule,
    BrowserAnimationsModule,
    ScrollToModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot({ itemCounter: itemCounterReducer, preOrder: preOrderReducer}),
    EffectsModule.forRoot([PreOrderEffects])
  ],
  providers: [OrderService, DatePipe, {provide: LOCALE_ID, useValue: 'ru'}],
  bootstrap: [AppComponent],
  entryComponents: [OkNoDialogComponent, OrderConfirmationDialogComponent]
})
export class AppModule { }
