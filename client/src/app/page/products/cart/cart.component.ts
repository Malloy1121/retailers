import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartItem} from "../../../model/cart-item";
import {OrderService} from "../../../service/order.service";

declare var screen: any;
declare var navigator: any;
declare var i: any;

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
  private items: CartItem[] = [];
  private isValid: boolean = true;
  private reg: RegExp = new RegExp(/^\d+$/);

  constructor(private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit() {
    console.log(screen.width);
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
    this.orderService.getCartItems()
      .toPromise()
      .then(data => {
        console.log(data);
        if (data.result == true) {
          this.items = data.object;
        }
      });
  }

  proceedToCheckout() {
    this.router.navigateByUrl("/products/checkout");
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
    if (this.items.length == 0) {
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
    this.orderService.deleteCartItem(item)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.fetchItems();
        }
      });
  }

}
