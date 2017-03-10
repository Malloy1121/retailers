import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {PaymentBookComponent} from "./payment-book/payment-book.component";
import {AddressBookComponent} from "./address-book/address-book.component";
import {AddressComponent} from "./address-book/address.component";
/**
 * Created by Malloy on 3/9/2017.
 */
export const ACCOUNT_ROUTE:Routes=[
  {path:"",component:ProfileComponent,pathMatch:"full"},
  {path:"my_orders",component:OrderListComponent},
  {path:"my_payments",component:PaymentBookComponent},
  {path:"my_addresses",component:AddressBookComponent},
  {path:"update_address",component:AddressComponent},
  {path:"**",redirectTo:"",pathMatch:"full"}
];
