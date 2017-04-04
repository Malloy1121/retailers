import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import "rxjs/Rx";
import {Router} from "@angular/router";
import {Observable, Subject, Subscription} from "rxjs";
import {User} from "../model/user";

@Injectable()
export class AuthService {
  private currentUser;
  private subject: Subject<any> = new Subject();
  private url = "";
  private sub: Subscription;
  // private url="http://localhost:8080";

  constructor(private http: Http, private router: Router) {
    this.sub = this.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        if (data.result == true) {
          this.currentUser = data.object;
          this.subject.next(data.object);
        }
        else {
          this.currentUser = null;
          this.subject.next(null);
        }
      });
  }

  login(value, url) {
    console.log(value);
    const body = new URLSearchParams();
    body.set("email", value.email);
    const header = new Headers();
    header.set("Content-Type", "application/x-www-form-urlencoded");
    body.set("password", value.password);
    return this.http.post(this.url + "/login", body.toString(), {headers: header})
      .map((response: Response) => {
        if (response.status >= 400) {
          throw new Error("Login Failed");
        }
        return response.json();
      })
      .toPromise()
      .then(data => {
        console.log(data);
        this.currentUser = data;
        this.subject.next(this.currentUser);
        if (url == null) {
          this.router.navigateByUrl("/");
        }
        else {
          this.router.navigateByUrl(url);
        }
        return data;
      })
      .catch(error => console.log(error));

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
          this.subject.next(null);
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

  getUser() {
    return this.subject;
  }

  unsub() {
    this.sub.unsubscribe();
  }
}
