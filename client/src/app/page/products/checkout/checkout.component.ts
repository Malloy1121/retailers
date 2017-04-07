import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../service/order.service";
import {CartItem} from "../../../model/cart-item";

declare var window: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss', "./checkout-edit.scss"]
})
export class CheckoutComponent implements OnInit {
  private paymentSelectShown: boolean = false;
  private addressSelectShown: boolean = false;
  private cartItems: CartItem[] = [];

  constructor(private router: Router, private orderService: OrderService) {
  }

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.orderService.getCartItems()
      .toPromise()
      .then(data => {
        console.log(data);
        if (data.result == true) {
          this.cartItems = data.object;
        }
      });
  }


  goToDetail(id) {
    this.router.navigate(["/products/product/" + id]);
  }

  openPaymentSelect() {
    this.paymentSelectShown = true;
  }

  closePaymentSelect() {
    this.paymentSelectShown = false;
  }

  openAddressSelect() {
    this.addressSelectShown = true;
  }

  closeAddressSelect() {
    this.addressSelectShown = false;
  }

  addressOnSubmit() {
    this.closeAddressSelect();
  }

  paymentOnSubmit() {
    this.closePaymentSelect()
  }
}
