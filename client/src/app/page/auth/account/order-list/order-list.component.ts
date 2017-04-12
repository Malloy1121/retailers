import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Order} from "../../../../model/order";
import {OrderService} from "../../../../service/order.service";

declare var alert: any;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  private index: number = 1;
  private paramsSub: Subscription;
  private orders: Order[] = [];

  constructor(private actRoute: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) {
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
        this.switchPanel(this.index);
      });
  }

  fetchOrders(index) {
    this.orderService.fetchOrders(index, 1)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.orders = data.object;
          console.log(this.orders);
        }
        else {
          alert("Request failed!\nPlease try again!");
        }
      });
  }

  switchPanel(index) {
    this.router.navigateByUrl("/auth/account/my_orders/" + index);
    this.index = index;
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
