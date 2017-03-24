import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss', "../order-list/order-list.component.scss"]
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  private id: number;

  constructor(private actRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramsSub = this.actRoute.params.subscribe(data => {
      this.id = data["id"];
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
