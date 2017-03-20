import {Component, OnInit} from '@angular/core';

declare var screen: any;
declare var navigator: any;
declare var i: any;

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    console.log(screen.width);
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      console.log("mobile");
    }
    else {
      console.log("desktop");
    }
  }

}
