import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../../../service/cart.service";
import {CartItem} from "../../../model/cart-item";
import {Payment} from "../../../model/payment";
import {Address} from "../../../model/address";
import {CheckoutService} from "../../../service/checkout.service";
import {Checkout} from "../../../model/checkout";
import {ProfileService} from "../../../service/profile.service";
import {MyEmitService} from "../../../service/emit.service";

declare var window: any;
declare var alert: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss', "./checkout-edit.scss"]
})
export class CheckoutComponent implements OnInit {
  private paymentSelectShown: boolean = false;
  private addressSelectShown: boolean = false;
  private cartItems: CartItem[] = [];
  private currentPayment: Payment;
  private currentAddress: Address;
  private checkedAddress: Address;
  private checkedPayment: Payment;
  private payments: Payment[] = [];
  private addresses: Address[] = [];

  constructor(private router: Router,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private profileService: ProfileService,
              private emitService: MyEmitService) {
    this.currentPayment = new Payment();
    this.currentPayment.id = -1;
    this.currentAddress = new Address();
    this.currentAddress.id = -1;
  }

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {

    this.checkoutService.fetchCheckoutList()
      .toPromise()
      .then(data => {
        if (data.result == true) {
          const checkout: Checkout = data.object;
          this.cartItems = checkout.cartItems;
          this.currentAddress = checkout.address;
          this.currentPayment = checkout.payment;
          this.checkedAddress = this.currentAddress;
          this.checkedPayment = this.currentPayment;
          // console.log("cartItems: ", this.cartItems);
          // console.log("currentAddress: ", this.currentAddress);
          // console.log("currentPayment: ", this.currentPayment);
        }
        else {
          alert("Request failed!\nPlease try again!");
          this.router.navigateByUrl("/products/cart");
        }
      });
  }


  goToDetail(id) {
    this.router.navigate(["/products/product/" + id]);
  }

  openPaymentSelect() {
    this.profileService.getUserPayment()
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.payments = data.object;
          this.paymentSelectShown = true;
        }
        else {
          alert("Request failed!\nPlease try again!");
        }
      });
  }

  closePaymentSelect() {
    this.paymentSelectShown = false;
  }

  openAddressSelect() {
    this.profileService.getCurrentAddresses()
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.addresses = data.object;
          this.addressSelectShown = true;
        }
        else {
          alert("Request failed!\nPlease try again!");
        }
      });

  }

  closeAddressSelect() {
    this.addressSelectShown = false;
  }

  addressOnSubmit() {
    this.checkoutService.prepareAddress(this.checkedAddress)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.currentAddress = this.checkedAddress;
          this.closeAddressSelect();
        }
        else {
          alert("Request failed!\nPlease try again!");
        }
      });

  }

  paymentOnSubmit() {
    this.checkoutService.preparePayment(this.checkedPayment)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.currentPayment = this.checkedPayment;
          this.closePaymentSelect();
        }
        else {
          alert("Request failed!\nPlease try again!");
        }
      });

  }

  checkoutSubTotal() {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.unitPrice * item.amount;
    }

    return total;
  }

  checkoutTotal() {
    return this.checkoutSubTotal() + 4;
  }

  placeOrder() {
    this.checkoutService.doCheckout()
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.navigate("/auth/account/my_orders/2");
          this.emitService.cartItemAmountSubject.next(0);
        }
        else {
          alert("Request failed!\nPlease try again!");
        }
      });
  }

  navigate(url) {
    this.router.navigateByUrl(url);
  }
}
