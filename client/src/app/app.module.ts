import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, CookieXSRFStrategy, XSRFStrategy} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AuthService} from "./service/auth.service";
import {HomeComponent} from './page/home.component';
import {CartComponent} from './page/cart/cart.component';
import {DropdownDirective} from './directive/dropdown.directive';
import {RouterModule} from "@angular/router";
import {APP_ROUTE} from "./app.route";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTE)
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
