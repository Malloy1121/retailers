import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartItem} from "../../../model/cart-item";
import {CartService} from "../../../service/cart.service";
import {CheckoutService} from "../../../service/checkout.service";

declare var screen: any;
declare var navigator: any;
declare var i: any;
declare var alert: any;

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public items: CartItem[] = [];
  private reg: RegExp = new RegExp(/^\d+$/);
  public pending: boolean = false;

  constructor(private router: Router,
              private cartService: CartService,
              private checkoutService: CheckoutService) {
  }

  ngOnInit() {
    this.checkoutService.canGoToCheckout = false;
    // console.log(screen.width);
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      // console.log("mobile");
    }
    else {
      // console.log("desktop");
    }
    this.fetchItems();

  }

  fetchItems() {
    this.cartService.getCartItems()
      .toPromise()
      .then(data => {
        // console.log(data);
        if (data.result == true) {
          this.items = data.object;
          this.checkoutService.canGoToCheckout = (this.items.length != 0);
        }
      });
  }

  proceedToCheckout() {
    // console.log("cart items: ", this.items);
    this.checkoutService.prepareAll(this.items)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.router.navigateByUrl("/products/checkout");
        }
        else {
          alert("Request failed!\nPlease try again!");
        }
      });
  }

  goToDetail(id) {
    this.router.navigate(["/products/product/" + id]);
  }

  isAmountValid(item: CartItem) {
    if (item.amount <= 0 || item.amount > item.itemTypeInventory || !this.reg.test(item.amount)) {
      return false;
    }
    return true;
  }

  isAllValid() {
    if (this.items == null || this.items.length == 0) {
      return false;
    }
    for (let item of this.items) {
      const result = this.isAmountValid(item);
      if (!result) {
        return false;
      }
    }

    return true;
  }

  cartSubtotal() {
    let amount = 0;
    for (let item of this.items) {
      amount += item.unitPrice * item.amount;
    }

    return amount;
  }


  deleteItem(item: CartItem) {
    this.pending = true;
    this.cartService.deleteCartItem(item)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.fetchItems();
        }
        this.pending = false;
      });
  }


  ngOnDestroy() {
    this.checkoutService.canGoToCheckout = false;
  }
}
