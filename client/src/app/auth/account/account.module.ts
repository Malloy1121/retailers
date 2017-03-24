import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderListComponent} from './order-list/order-list.component';
import {ProfileComponent} from './profile/profile.component';
import {AddressBookComponent} from './address-book/address-book.component';
import {PaymentBookComponent} from './payment-book/payment-book.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ACCOUNT_ROUTE} from "./account.route";
import {AddressComponent} from './address-book/address.component';
import {ProfileUpdateComponent} from './profile/profile-update/profile-update.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ACCOUNT_ROUTE)
  ],
  declarations: [OrderListComponent, ProfileComponent, AddressBookComponent, PaymentBookComponent, AddressComponent, ProfileUpdateComponent, OrderDetailComponent]
})
export class AccountModule {
}
