import {
  Component, OnInit, ElementRef, ViewChild, OnDestroy
} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Category} from "../../model/category";
import {KeywordCollection} from "../../model/keyword-collection";
import {MyEmitService} from "../../service/emit.service";
import {AuthService} from "../../service/auth.service";
import {ShoppingService} from "../../service/shopping.service";


declare var document: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    "(document:click)": "onClick($event)"
  }
})
export class HeaderComponent implements OnInit, OnDestroy {


  public currentCategory: string = "All";
  private currentCategoryID: any = -1;
  public searchBarGetFocus: boolean = false;
  public isAuthenticated: boolean;
  private currentUser: any = null;
  public categories: Category[] = [];
  private isAccountShown: boolean = false;
  private isCartShown: boolean = false;
  private userSubscription: Subscription;
  private cartItemAmountSub: Subscription = new Subscription();
  public cartItemAmount = 0;
  public searchContent: string = "";
  private searchKeywords: string[] = [];
  private keywordListShown: boolean = false;
  public keywordListItem: KeywordCollection[] = [];

  @ViewChild("categoryMenu") select: ElementRef;
  @ViewChild("searchBox") searchBox: ElementRef;

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
      // console.log(data);
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

  onSearchInput() {
    this.keywordListShown = true;
    // console.log(this.searchContent);
    if (this.searchContent.trim().length == 0) {
      this.keywordListItem = [];
      return;
    }
    this.shpService.getProductsByKeywords(this.searchContent)
      .toPromise()
      .then(data => {
        this.keywordListItem = data.object;
        // console.log(this.keywordListItem);
      });
  }

  onSearch() {
    const splitedContent = this.searchContent.split(" ");
    for (let keyword of splitedContent) {
      if (keyword.trim().length > 0) {
        this.searchKeywords.push(keyword.trim());
      }
    }
    this.router.navigate(['/products/product-list/'],
      {
        queryParams: {
          categoryID: this.currentCategoryID,
          keywords: this.searchKeywords
        }
      });

    this.searchKeywords = [];
  }

  listItemOnClick(event, keyword) {
    this.searchContent = keyword;
    this.keywordListShown = false;
    this.router.navigate(["/products/product-list"], {
      queryParams: {
        categoryID: this.currentCategoryID,
        keywords: keyword
      }
    });

    this.keywordListShown = false;
    event.stopPropagation();

  }

  inputOnClick(event) {
    this.keywordListShown = !this.keywordListShown;
    event.stopPropagation();
  }

  onClick(event) {
    // console.log(!this.searchBox.nativeElement.contains(event.target));
    if (!this.searchBox.nativeElement.contains(event.target)) {
      this.keywordListShown = false;
    }
    else {
      this.keywordListShown = true;
    }
  }
}
