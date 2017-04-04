import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx";
import {CartItem} from "../model/cart-item";
import {Subject, Subscription} from "rxjs";

@Injectable()
export class OrderService {
  public cartItemAmountSubject: Subject<any> = new Subject();
  public cartItemsAmountSubscription: Subscription = new Subscription();
  private cartItemAmount = 0;

  constructor(private http: Http) {
  }

  subscribeToCartAmount() {
    this.cartItemsAmountSubscription = this.getCartItemAmount().subscribe(
      data => {
        if (data.result == true) {
          this.cartItemAmount = data.object;
          this.cartItemAmountSubject.next(this.cartItemAmount);
        }
        else {
          this.cartItemAmount = 0;
          this.cartItemAmountSubject.next(this.cartItemAmount);
        }
      }
    );
  }

  getCartItems() {
    return this.http.get("/orders/getCartItems")
      .map((response: Response) => response.json());
  }

  deleteCartItem(item: CartItem) {
    return this.http.delete("/orders/deleteCartItem/" + item.id)
      .map((response: Response) => response.json());
  }

  getCartItemAmount() {
    return this.http.get("/orders/getCartItemAmount")
      .map((response: Response) => {
        // console.log(response.json());
        return response.json();
      });
  }

  getWishListItems() {
    return this.http.get("/orders/getWishListItems")
      .map((response: Response) => {
        return response.json();
      });
  }

  unsub() {
    this.cartItemsAmountSubscription.unsubscribe();
  }

  addToCart(cartItem: CartItem) {
    return this.http.post("/orders/addToCart", cartItem)
      .map((response: Response) => {
        return response.json();
      });
  }

  addToWishList(cartItem: CartItem) {
    return this.http.post("/orders/addToWishList", cartItem)
      .map((response: Response) => {
        return response.json();
      });
  }

  removeWishListItem(cartItem: CartItem) {
    return this.http.delete("/orders/removeWishListItem/" + cartItem.id)
      .map((response: Response) => {
        return response.json();
      });
  }

  clearWishList() {
    return this.http.delete("/orders/clearWishList/")
      .map((response: Response) => {
        return response.json();
      });
  }

  moveOneFromWishListToCart(item: CartItem) {
    return this.http.post("/orders/moveOneFromWishListToCart/", item)
      .map((response: Response) => {
        return response.json();
      });
  }

  moveAllFromWishListToCart(item:CartItem[]) {
    return this.http.post("/orders/moveAllFromWishListToCart",item)
      .map((response: Response) => {
        return response.json();
      });
  }
}
