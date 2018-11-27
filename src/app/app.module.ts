import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

const appRoutes: Routes = [
  { path: 'good-list', component: GoodListComponent },
  { path: 'order', component: OrderComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    LoginComponent,
    RegistrationComponent,
    GoodListComponent,
    GoodDetailsComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot({ itemCounter: itemCounterReducer, preOrder: preOrderReducer}),
    EffectsModule.forRoot([PreOrderEffects])
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
