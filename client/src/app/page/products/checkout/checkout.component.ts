import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

declare var window: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss', "./checkout-edit.scss"]
})
export class CheckoutComponent implements OnInit {
  private paymentSelectShown: boolean = false;
  private addressSelectShown: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
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
