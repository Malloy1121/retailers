import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {MyEmitService} from "../../service/emit.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  private buttons = [];
  @Input("currentPage") private currentPage: number = 1;
  @Input("totalPages") private totalPages: number = 2;

  private pageSub: Subscription;

  constructor(private emitService: MyEmitService) {
  }

  ngOnInit() {
    this.pageSub = this.emitService.totalPageSubject
      .subscribe(data => {
        this.totalPages = data;
        this.changeButtons(this.currentPage);
      });
  }

  changeButtons(page) {
    let target = page;
    if (page <= 2) {
      target = 3;
    }
    else if (page >= this.totalPages - 2) {
      target = this.totalPages - 2;
    }


    this.buttons = [];
    if (this.totalPages <= 0) {
      this.totalPages = 1;
    }
    for (let i = target - 2; i <= this.totalPages && i < target + 3; i++) {
      if (i > 0) {
        this.buttons.push(i);
      }
    }
    this.currentPage = page;
    this.emitService.currentPageSubject.next(this.currentPage);
  }

  ngOnDestroy() {
    this.pageSub.unsubscribe();
  }

}
