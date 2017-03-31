import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, CookieXSRFStrategy, XSRFStrategy} from '@angular/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AuthService} from "./service/auth.service";
import {HomeComponent} from './page/home.component';
import {RouterModule} from "@angular/router";
import {APP_ROUTE} from "./app.route";
import {ProfileService} from "./service/profile.service";
import {AuthGuard} from "./service/auth.guard";
import {ShoppingService} from "./service/shopping.service";
import {ProductDetailGuard} from "./service/product-detail.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTE)
  ],
  providers: [
    AuthService,
    ProfileService,
    ShoppingService,
    AuthGuard,
    ProductDetailGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
