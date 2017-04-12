import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/operator/map";
import {CartItem} from "../model/cart-item";
import {MyEmitService} from "./emit.service";

@Injectable()
export class CartService {

  constructor(private http: Http, private emitService: MyEmitService) {
  }

  getCartItems() {
    return this.http.get("/cart/getCartItems")
      .map((response: Response) => response.json());
  }

  deleteCartItem(item: CartItem) {
    return this.http.delete("/cart/deleteCartItem/" + item.id)
      .map((response: Response) => response.json())
      .do(data => {
        if (data.result == true) {
          this.updateCartItemAmount();
        }
      });
  }

  updateCartItemAmount() {
    this.getCartItemAmount()
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.emitService.cartItemAmountSubject.next(data.object);
        }
      });
  }

  getCartItemAmount() {
    return this.http.get("/cart/getCartItemAmount")
      .map((response: Response) => {
        // console.log(response.json());
        return response.json();
      });
  }

  getWishListItems() {
    return this.http.get("/cart/getWishListItems")
      .map((response: Response) => {
        return response.json();
      });
  }

  addToCart(cartItem: CartItem) {
    return this.http.post("/cart/addToCart", cartItem)
      .map((response: Response) => {
        return response.json();
      })
      .do(data => {
        if (data.result == true) {
          this.updateCartItemAmount();
        }
      });
  }

  addToWishList(cartItem: CartItem) {
    return this.http.post("/cart/addToWishList", cartItem)
      .map((response: Response) => {
        return response.json();
      });
  }

  removeWishListItem(cartItem: CartItem) {
    return this.http.delete("/cart/removeWishListItem/" + cartItem.id)
      .map((response: Response) => {
        return response.json();
      });
  }

  clearWishList() {
    return this.http.delete("/cart/clearWishList/")
      .map((response: Response) => {
        return response.json();
      });
  }

  moveOneFromWishListToCart(item: CartItem) {
    return this.http.post("/cart/moveOneFromWishListToCart/", item)
      .map((response: Response) => {
        return response.json();
      })
      .do(data => {
        if (data.result == true) {
          this.updateCartItemAmount();
        }
      });
  }

  moveAllFromWishListToCart(item: CartItem[]) {
    return this.http.post("/cart/moveAllFromWishListToCart", item)
      .map((response: Response) => {
        return response.json();
      })
      .do(data => {
        if (data.result == true) {
          this.updateCartItemAmount();
        }
      });
  }
}
