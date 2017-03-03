import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderListComponent} from './order-list/order-list.component';
import {ProfileComponent} from './profile/profile.component';
import {AddressBookComponent} from './address-book/address-book.component';
import {PaymentBookComponent} from './payment-book/payment-book.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderListComponent, ProfileComponent, AddressBookComponent, PaymentBookComponent]
})
export class AccountModule {
}
