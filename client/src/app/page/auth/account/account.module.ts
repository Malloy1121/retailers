import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderListComponent} from './order-list/order-list.component';
import {ProfileComponent} from './profile/profile.component';
import {AddressBookComponent} from './address-book/address-book.component';
import {PaymentBookComponent} from './payment-book/payment-book.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ACCOUNT_ROUTE} from "./account.route";
import {AddressComponent} from './address-book/address.component';
import {ProfileUpdateComponent} from './profile/profile-update/profile-update.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {WishListComponent} from "./wish-list/wish-list.component";
import {SharedModule} from "../../../pipe/shared-module/shared.module";

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(ACCOUNT_ROUTE)
  ],
  declarations: [
    OrderListComponent,
    ProfileComponent,
    AddressBookComponent,
    PaymentBookComponent,
    AddressComponent,
    ProfileUpdateComponent,
    OrderDetailComponent,
    WishListComponent,
  ]
})
export class AccountModule {
}
