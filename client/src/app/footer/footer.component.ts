import { Component, OnInit } from '@angular/core';

declare var scrollTo,window:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toTop(){
    scrollTo(window.pageXOffset,0);
  }

}
