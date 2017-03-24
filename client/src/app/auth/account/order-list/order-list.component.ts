import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  private index: number = 1;
  private paramsSub: Subscription;

  constructor(private actRoute: ActivatedRoute,private router:Router) {
  }

  ngOnInit() {
    this.paramsSub = this.actRoute.params
      .subscribe((data: Params) => {
        if (data["id"]) {
          this.index = data["id"];
        }
        else {
          this.index = 1;
        }
      });
  }

  switchPanel(index) {
    this.index = index;
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  goToDetail(id) {
    this.router.navigate(["/products/product/"+id]);
  }

  gotToOrderDetail(id){
    this.router.navigateByUrl("/auth/account/order_detail/"+id);
  }

}
