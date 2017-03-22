import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from "./cart/cart.component";
import {ItemListComponent} from "./item/item-list/item-list.component";
import {ItemDetailComponent} from "./item/item-detail/item-detail.component";
import {RouterModule} from "@angular/router";
import {PRODUCTS_ROUTE} from "./products.route";
import {CheckoutComponent} from './checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FixBoxDirective} from "../../directive/fix-box.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCTS_ROUTE)
  ],
  declarations: [
    CartComponent,
    ItemListComponent,
    ItemDetailComponent,
    CheckoutComponent,
    FixBoxDirective
  ]
})
export class ProductsModule {
}
