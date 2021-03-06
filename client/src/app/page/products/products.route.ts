import {Routes} from "@angular/router";
import {CartComponent} from "./cart/cart.component";
import {ItemListComponent} from "./item/item-list/item-list.component";
import {ItemDetailComponent} from "./item/item-detail/item-detail.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {ProductDetailGuard} from "../../service/product-detail.service";
import {AuthGuard} from "../../service/auth.guard";
import {CheckoutGuard} from "../../service/checkout.guard";
/**
 * Created by Malloy on 2017/3/12.
 */
export const PRODUCTS_ROUTE: Routes = [
  {path: "cart", component: CartComponent,canActivate:[AuthGuard]},
  // {path: "product-list", redirectTo:"product-list/-1",pathMatch:"full"},
  {path: "product-list", component: ItemListComponent},
  {path: "product", redirectTo: "product-list",pathMatch:"full"},
  {path: "product/:id", component: ItemDetailComponent},
  {path: "checkout", component: CheckoutComponent,canActivate: [AuthGuard,CheckoutGuard]},
  {path: "", redirectTo: "/", pathMatch: "full"},
  {path: "**", redirectTo: "", pathMatch: "full"}
];
