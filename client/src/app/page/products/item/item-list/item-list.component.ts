import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingService} from "../../../../service/shopping.service";
import {Product} from "../../../../model/product";
import "rxjs/Rx";
import {Subscription} from "rxjs";
import {MyEmitService} from "../../../../service/emit.service";

declare var alert: any;

@Component({
  selector: 'app-item-list',
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  public products: Product[] = [];
  private currentCategoryID: number = -1;
  private keywords: string[] = [];
  public currentPage: number = 1;
  private totalPages: number = 1;
  public highestPrice: any = "";
  public lowestPrice: any = "";
  private reg: RegExp = new RegExp(/^(\d+\.?\d{0,2})$/);
  private currentPageSub: Subscription;
  private isSorted: number = 0;

  constructor(private router: Router,
              private shpService: ShoppingService,
              private actRoute: ActivatedRoute,
              private emitService: MyEmitService) {
  }

  ngOnInit() {
    this.paramSub = this.actRoute.queryParams
      .subscribe(data => {
        this.highestPrice = "";
        this.lowestPrice = "";
        this.isSorted = 0;
        if (data["categoryID"]) {
          this.currentCategoryID = data["categoryID"];
        }
        else {
          this.currentCategoryID = -1;
        }
        console.log("keywords: ", data["keywords"]);
        if (data["keywords"] && data["keywords"].length > 0) {
          this.keywords = data["keywords"];
        }
        else {
          this.keywords = [];
        }

        console.log("keywords length: ", this.keywords.length);
        if (this.keywords.length == 0) {
          this.fetchItems();
        }
        else {
          this.fetchItemsByKeywords()
        }

      });

    this.currentPageSub = this.emitService.currentPageSubject
      .subscribe(data => {
        if (data != this.currentPage) {
          this.currentPage = data;
          if (this.isSorted == 0) {
            this.searchByPriceRange();
          }
          else {
            this.orderByPrice(this.isSorted,this.currentPage);
          }
        }
      });

  }

  fetchItems() {
    this.shpService.getProductsByCategory(this.currentCategoryID, this.currentPage, -1, -1)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.products = data.object;
          this.totalPages = data.totalPages;
          this.emitService.totalPageSubject.next(this.totalPages);
          // this.emitService.changePageSubject.next(this.currentPage);
          console.log(data);
        }
      });
  }

  fetchItemsByKeywords() {
    this.shpService.getProductsByCategoryAndKeyword(this.currentCategoryID, this.keywords, this.currentPage, -1, -1)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.products = data.object;
          this.totalPages = data.totalPages;
          this.emitService.totalPageSubject.next(this.totalPages);
          // this.emitService.changePageSubject.next(this.currentPage);
          console.log(data);
        }
      });
  }

  goToDetail(id) {
    this.router.navigate(["/products/product/" + id]);
  }


  orderByPrice(ascending: number,page:number) {
    this.isSorted = ascending;
    this.currentPage=page;
    this.emitService.changePageSubject.next(page);
    this.shpService.getProductsByPriceOrder(this.currentCategoryID, this.currentPage, this.keywords, ascending, this.lowestPrice, this.highestPrice)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.products = data.object;
          this.totalPages = data.totalPages;
          this.emitService.totalPageSubject.next(this.totalPages);
          console.log(data);
        }
      });
  }

  priceRangeOnClick() {
    let flag = true;
    if (this.highestPrice != null && this.highestPrice.length > 0 && !this.reg.test(this.highestPrice)) {
      flag = false;
    }

    if (this.lowestPrice != null && this.lowestPrice.length > 0 && !this.reg.test(this.lowestPrice)) {
      flag = false;
    }

    if (this.highestPrice == null && this.lowestPrice == null) {
      flag = false;
    }

    if (flag == false) {
      alert("Please enter valid price value!");
    }
    else {
      this.currentPage=1;
      this.searchByPriceRange();
    }
  }

  searchByPriceRange() {
    // this.currentPage = 1;
    this.emitService.changePageSubject.next(this.currentPage);
    this.shpService.getProductsByCategoryAndKeyword(this.currentCategoryID, this.keywords, this.currentPage, this.lowestPrice, this.highestPrice)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.products = data.object;
          this.totalPages = data.totalPages;
          this.emitService.totalPageSubject.next(this.totalPages);
          console.log(data);
        }
      });
  }

  ngOnDestroy() {
    this.currentPageSub.unsubscribe();
  }

}
