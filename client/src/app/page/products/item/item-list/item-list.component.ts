import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingService} from "../../../../service/shopping.service";
import {Product} from "../../../../model/product";
import "rxjs/Rx";
import {Subscription} from "rxjs";

declare var alert: any;

@Component({
  selector: 'app-item-list',
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  private paramSub: Subscription;
  private products: Product[] = [];
  private currentCategoryID: number = -1;
  private keywords: string[] = [];
  private page: number = 0;
  private highestPrice = "";
  private lowestPrice = "";
  private reg: RegExp = new RegExp(/^(\d+\.?\d{0,2})$/);

  constructor(private router: Router,
              private shpService: ShoppingService,
              private actRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramSub = this.actRoute.queryParams
      .subscribe(data => {
        this.highestPrice = "";
        this.lowestPrice = "";
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

  }

  fetchItems() {
    this.shpService.getProductsByCategory(this.currentCategoryID, 1, -1, -1)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.products = data.object;
          console.log(this.products);
        }
      });
  }

  fetchItemsByKeywords() {
    this.shpService.getProductsByCategoryAndKeyword(this.currentCategoryID, this.keywords, 1, -1, -1)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.products = data.object;
          console.log(this.products);
        }
      });
  }

  goToDetail(id) {
    this.router.navigate(["/products/product/" + id]);
  }


  orderByPrice(ascending: boolean) {
    this.shpService.getProductsByPriceOrder(this.currentCategoryID, this.keywords, ascending, this.lowestPrice, this.highestPrice)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.products = data.object;
          console.log(this.products);
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
      this.searchByPriceRange();
    }
  }

  searchByPriceRange() {
    this.shpService.getProductsByCategoryAndKeyword(this.currentCategoryID, this.keywords, 1, this.lowestPrice, this.highestPrice)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.products = data.object;
          console.log(this.products);
        }
      });
  }

}
