import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Order} from "../../../../model/order";
import {OrderService} from "../../../../service/order.service";
import {MyEmitService} from "../../../../service/emit.service";

declare var alert: any;
declare var window: any;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  private index: number = 1;
  private paramsSub: Subscription;
  private orders: Order[] = [];
  private currentPage: number = 1;
  private totalPages: number = 1;
  private currentPageSub: Subscription;

  constructor(private actRoute: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private emitService: MyEmitService) {
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
        this.fetchOrders(this.index);
      });

    this.currentPageSub = this.emitService.currentPageSubject
      .subscribe(data => {
        if (data != this.currentPage) {
          this.currentPage = data;
          this.fetchOrders(this.index);
          window.scrollTo(window.pageXOffset, 0)
        }
      });
  }

  fetchOrders(index) {
    this.orderService.fetchOrders(index, this.currentPage)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.orders = data.object;
          this.totalPages = data.totalPages;
          this.emitService.totalPageSubject.next(this.totalPages);
          console.log(data);
        }
        else {
          alert("Request failed!\nPlease try again!");
        }
      });
  }

  switchPanel(index) {
    this.router.navigateByUrl("/auth/account/my_orders/" + index);
    this.index = index;
    this.currentPage = 1;
    this.fetchOrders(index);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  goToDetail(id) {
    this.router.navigate(["/products/product/" + id]);
  }

  gotToOrderDetail(id) {
    this.router.navigateByUrl("/auth/account/order_detail/" + id);
  }
}
