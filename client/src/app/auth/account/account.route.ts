import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {PaymentBookComponent} from "./payment-book/payment-book.component";
import {AddressBookComponent} from "./address-book/address-book.component";
import {AddressComponent} from "./address-book/address.component";
import {ProfileUpdateComponent} from "./profile/profile-update/profile-update.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {WishListComponent} from "./wish-list/wish-list.component";
/**
 * Created by Malloy on 3/9/2017.
 */
export const ACCOUNT_ROUTE: Routes = [
  {path: "", component: ProfileComponent, pathMatch: "full"},
  {path: "my_orders", redirectTo: "my_orders/1"},
  {path: "my_orders/:id", component: OrderListComponent},
  {path: "order_detail", component: OrderListComponent},
  {path: "order_detail/:id", component: OrderDetailComponent},
  {path: "my_payments", component: PaymentBookComponent},
  {path: "my_payments/:id", component: PaymentBookComponent},
  {path: "my_addresses", component: AddressBookComponent},
  {path: "update_address", component: AddressComponent},
  {path: "update_profile", component: ProfileUpdateComponent},
  {path: "wish-list", component: WishListComponent},
  {path: "**", redirectTo: "", pathMatch: "full"}
];
