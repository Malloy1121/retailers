import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ShoppingService} from "../../../../service/shopping.service";
import {Product} from "../../../../model/product";
import "rxjs/Rx";

@Component({
  selector: 'app-item-list',
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  private products: Product[] = [];

  constructor(private router: Router, private shpService: ShoppingService) {
  }

  ngOnInit() {
    this.shpService.getProductsByCategory(5, 1)
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

}
