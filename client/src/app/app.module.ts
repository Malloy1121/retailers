import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './page/header/header.component';
import {FooterComponent} from './page/footer/footer.component';
import {AuthService} from "./service/auth.service";
import {HomeComponent} from './page/home.component';
import {RouterModule} from "@angular/router";
import {APP_ROUTE} from "./app.route";
import {ProfileService} from "./service/profile.service";
import {AuthGuard} from "./service/auth.guard";
import {ShoppingService} from "./service/shopping.service";
import {ProductDetailGuard} from "./service/product-detail.service";
import {CartService} from "./service/cart.service";
import {MyEmitService} from "./service/emit.service";
import {CheckoutService} from "./service/checkout.service";
import {CheckoutGuard} from "./service/checkout.guard";
import {OrderService} from "./service/order.service";
import { YearPipe } from './pipe/year.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTE, {useHash: true})
  ],
  providers: [
    AuthService,
    ProfileService,
    ShoppingService,
    AuthGuard,
    ProductDetailGuard,
    CartService,
    MyEmitService,
    CheckoutService,
    CheckoutGuard,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
