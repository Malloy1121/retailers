import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Order} from "../../../../model/order";
import {Payment} from "../../../../model/payment";
import {Address} from "../../../../model/address";
import {OrderItem} from "../../../../model/order-item";
import {OrderService} from "../../../../service/order.service";

declare var alert: any;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss', "../order-list/order-list.component.scss"]
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  private id: number;
  private orders: Order[] = [];
  private payment: Payment;
  private address: Address;
  private items: OrderItem[] = [];

  constructor(private actRoute: ActivatedRoute,
              private orderService: OrderService,
              private changeRef: ChangeDetectorRef,
              private router: Router) {

  }

  ngOnInit() {
    const self = this;
    this.paramsSub = this.actRoute.params.subscribe(data => {
      this.id = data["id"];
      this.fetchOrder(self);
    });
  }

  fetchOrder(self) {
    // const self=this;
    this.orderService.fetchOrderDetail(this.id)
      .toPromise()
      .then(data => {

        if (data.result == true) {
          self.orders = [];
          self.orders.push(data.object);
          // self.payment = self.order.payment;
          // self.address = self.order.address;
          self.items = self.orders[0].items;
          // self.changeRef.markForCheck();
          // self.changeRef.detectChanges();
          // console.log(self.orders);
        }
        else {
          alert("Request failed!\nPlease try again!");
          this.router.navigateByUrl("/auth/account/my_orders");
        }
      });
  }

  goToDetail(id) {
    this.router.navigate(["/products/product/" + id]);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
