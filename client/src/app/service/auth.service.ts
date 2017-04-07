import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import "rxjs/operator/map";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../model/user";
import {OrderService} from "./order.service";
import {MyEmitService} from "./emit.service";

@Injectable()
export class AuthService {
  public currentUser;
  private url = "";
  private sub: Subscription;

  constructor(private http: Http,
              private router: Router,
              private orderService: OrderService,
              private emitService: MyEmitService) {

    this.sub = this.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        if (data.result == true) {
          this.currentUser = data.object;
          this.emitService.userStatusSubject.next(data.object);
          this.orderService.updateCartItemAmount();
        }
        else {
          this.currentUser = null;
          this.emitService.userStatusSubject.next(null);
          this.emitService.cartItemAmountSubject.next(0);
        }
      });
  }


  login(value) {
    // console.log(value);
    const body = new URLSearchParams();
    body.set("email", value.email);
    const header = new Headers();
    header.set("Content-Type", "application/x-www-form-urlencoded");
    body.set("password", value.password);
    return this.http.post(this.url + "/login", body.toString(), {headers: header})
      .map((response: Response) => {
        // if (response.status >= 400) {
        //   throw new Error("Login Failed");
        // }
        return response.json();
      });


  }

  logout() {
    return this.http.request(this.url + "/logout")
      .map((response: Response) => {
        const result = response.status;
        return result;
      })
      .do((data) => {
        if (data == 200) {
          this.currentUser = null;
          this.emitService.userStatusSubject.next(null);
          this.emitService.cartItemAmountSubject.next(0);
        }
      });
  }

  signUp(value: User) {
    console.log(value);
    return this.http.post(this.url + "/auth/signup", value)
      .map((response: Response) => response.json());
  }

  getIsAuthenticated() {
    const isAuthenticated = this.currentUser != null;
    return isAuthenticated;
  }

  isEmailTaken(email) {
    return this.http.post(this.url + "/auth/isEmailTaken", email)
      .map((response: Response) => response.json());
  }

  getCurrentUser() {
    return this.http.get(this.url + "/auth/getCurrentUser")
      .map((response: Response) => {
        return response.json();
      });
  }


  unsub() {
    this.sub.unsubscribe();
  }
}
