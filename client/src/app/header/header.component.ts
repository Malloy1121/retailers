import {
  Component, OnInit, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef
} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import "rxjs";
import {Observable, Subscription} from "rxjs";
import {ShoppingService} from "../service/shopping.service";
import {Category} from "../model/category";
import {OrderService} from "../service/order.service";
import {MyEmitService} from "../service/emit.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  private currentCategory: string = "All";
  private currentCategoryID: any = 0;
  private searchBarGetFocus: boolean = false;
  private isAuthenticated: boolean;
  private currentUser: any = null;
  private categories: Category[] = [];
  private isAccountShown: boolean = false;
  private isCartShown: boolean = false;
  private userSubscription: Subscription;
  private cartItemAmountSub: Subscription = new Subscription();
  private cartItemAmount = 0;

  @ViewChild("categoryMenu") select: ElementRef;

  constructor(private emitService: MyEmitService,
              private authService: AuthService,
              private router: Router,
              private shpService: ShoppingService) {
  }

  ngOnInit() {
    this.currentCategory = this.select.nativeElement.options[this.select.nativeElement.selectedIndex].text;


    this.shpService.getAllCategories()
      .toPromise()
      .then(data => {
        const categories = data.object;
        // console.log(categories);
        this.categories = categories;
      });

    this.userSubscription = this.emitService.userStatusSubject.subscribe(data => {
      console.log(data);
      this.currentUser = data;
      this.isAuthenticated = this.currentUser != null;
    });

    this.cartItemAmountSub = this.emitService.cartItemAmountSubject
      .subscribe(data => {
        this.cartItemAmount = data;
      });

  }


  searchBarOnFocus() {
    this.searchBarGetFocus = true;
  }

  searchBarOnBlur() {
    this.searchBarGetFocus = false;
  }

  login() {
    // this.isAuthenticated = this.authService.login();
    this.router.navigateByUrl("/auth/login");
  }

  logout() {
    this.authService.logout()
      .toPromise()
      .then(data => {
        if (data == 200) {
          this.currentUser = null;
          this.router.navigateByUrl("/");
        }
      });
  }

  signUp() {
    this.router.navigateByUrl("/auth/register");
  }

  categoryOnClick(option) {
    this.currentCategory = option.text;
    this.currentCategoryID = option.value;
  }

  accountOpen() {
    this.isAccountShown = true;
  }

  accountClose() {
    this.isAccountShown = false;
  }

  cartOpen() {
    this.isCartShown = true;
  }

  cartClose() {
    this.isCartShown = false;
  }

  navigate(uri) {
    this.router.navigateByUrl(uri);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.cartItemAmountSub.unsubscribe();
  }
}
