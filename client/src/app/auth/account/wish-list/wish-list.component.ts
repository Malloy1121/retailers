import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartItem} from "../../../model/cart-item";
import {OrderService} from "../../../service/order.service";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss', "../../../page/products/cart/cart.component.scss"]
})
export class WishListComponent implements OnInit {
  private wishListItems: CartItem[] = [];
  private reg: RegExp = new RegExp(/^\d+$/);

  constructor(private router: Router, private orderService: OrderService) {
  }

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.orderService.getWishListItems()
      .toPromise()
      .then(data => {
        if (data.result == true) {
          console.log(data.object);
          this.wishListItems = data.object;
        }
        else {
          this.router.navigateByUrl("/");
        }
      });
  }

  moveToCart(item: CartItem) {
    this.orderService.moveOneFromWishListToCart(item)
      .toPromise()
      .then(data => {
        if (data.result == 1) {
          this.fetchItems();
        }
      });
  }

  moveAllToCart() {
    this.orderService.moveAllFromWishListToCart(this.wishListItems)
      .toPromise()
      .then(data => {
        if (data.result == 1) {
          this.fetchItems();
        }
      });
  }

  removeOne(item: CartItem) {
    this.orderService.removeWishListItem(item)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.fetchItems();
        }
      });
  }

  removeAll() {
    this.orderService.clearWishList()
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.fetchItems();
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
    if (this.wishListItems.length == 0) {
      return false;
    }

    for (let item of this.wishListItems) {
      const result = this.isAmountValid(item);
      if (!result) {
        return false;
      }
    }

    return true;
  }

}
