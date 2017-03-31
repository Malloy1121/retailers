import {
  Component, OnInit, ElementRef, ViewChild, OnDestroy
} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import "rxjs";
import {Subscription} from "rxjs";
import {ShoppingService} from "../service/shopping.service";
import {Category} from "../model/category";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  private currentCategory: string = "All";
  private currentCategoryID: any=0;
  private searchBarGetFocus: boolean = false;
  private isAuthenticated: boolean;
  private currentUser: any = null;
  private categories: Category[] = [];
  private isAccountShown: boolean = false;
  private isCartShown: boolean = false;
  private userSubscription: Subscription;

  @ViewChild("categoryMenu") select: ElementRef;

  constructor(private authService: AuthService,
              private router: Router,
              private shpService: ShoppingService) {
  }

  ngOnInit() {
    this.currentCategory = this.select.nativeElement.options[this.select.nativeElement.selectedIndex].text;

    this.shpService.getAllCategories()
      .toPromise()
      .then(data => {
        const categories = data.object;
        console.log(categories);
        this.categories = categories;
      });

    this.currentUser = this.authService.getCurrentUser()
      .toPromise()
      .then(data => {
        console.log(data);
        if (data.result == true) {
          this.currentUser = data.object;
          this.isAuthenticated = true;
        }
        else {
          this.isAuthenticated = false;
        }
      });

    this.userSubscription = this.authService.getUser().subscribe(data => {
      console.log(data);
      this.currentUser = data;
      this.isAuthenticated = this.currentUser != null;
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
  }
}
