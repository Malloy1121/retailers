import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {CartItem} from "../model/cart-item";
import "rxjs/operator/map";
import {Payment} from "../model/payment";
import {Address} from "../model/address";

@Injectable()
export class CheckoutService {
  public canGoToCheckout: boolean = false;

  constructor(private http: Http) {
  }

  prepareAll(items: CartItem[]) {
    return this.http.post("/checkout/prepareItems", items)
      .map(response => response.json());
  }

  preparePayment(payment: Payment) {
    return this.http.post("/checkout/preparePayment", payment)
      .map(response => response.json());
  }

  prepareAddress(address: Address) {
    return this.http.post("/checkout/preparePayment", address)
      .map(response => response.json());
  }

  doCheckout() {
    return this.http.get("/checkout/doCheckout")
      .map(response => response.json());
  }

  fetchCheckoutList() {
    return this.http.get("/checkout/getCheckoutList")
      .map(response => response.json());
  }

}
