import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  private buttons = [];
  @Input() private currentPage: number = 1;
  @Input() private totalPages: number = 6;

  constructor() {
  }

  ngOnInit() {

    this.changeButtons(this.currentPage);

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
    for (let i = target - 2; i <= this.totalPages && i < target + 3; i++) {
      if(i>0){
        this.buttons.push(i);
      }
    }
    this.currentPage = page;
    // console.log(this.buttons);
  }

}
