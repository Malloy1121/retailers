import {Routes} from "@angular/router";
import {CartComponent} from "./cart/cart.component";
import {ItemListComponent} from "./item/item-list/item-list.component";
import {ItemDetailComponent} from "./item/item-detail/item-detail.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {ProductDetailGuard} from "../../service/product-detail.service";
/**
 * Created by Malloy on 2017/3/12.
 */
export const PRODUCTS_ROUTE: Routes = [
  {path: "cart", component: CartComponent},
  {path: "product-list", component: ItemListComponent},
  {path: "product", redirectTo: "product-list"},
  {path: "product/:id", component: ItemDetailComponent, canActivate: [ProductDetailGuard]},
  {path: "checkout", component: CheckoutComponent},
  {path: "", redirectTo: "/", pathMatch: "full"},
  {path: "**", redirectTo: "", pathMatch: "full"}
];
