import {Component, OnInit, ElementRef, ViewChild, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  private currentCategory: string = "All";
  private searchBarGetFocus: boolean = false;
  private isAuthenticated: boolean;
  private currentUser: any;
  private categories = ["alfkjdalf", "sd", "a", "fdaf", "fsadf", "asdffasdfasfasfa"];
  private isAccountShown: boolean = false;
  private isCartShown: boolean = false;
  private userSubscription: Subscription;

  @ViewChild("categoryMenu") select: ElementRef;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.currentCategory = this.select.nativeElement.options[this.select.nativeElement.selectedIndex].text;

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

  categoryOnClick(category) {
    this.currentCategory = category;
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
