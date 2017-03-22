import {Directive, HostBinding, HostListener, Input} from '@angular/core';

declare var window: any;

@Directive({
  selector: '[appFixBox]'
})
export class FixBoxDirective {

  private currentTopOffset: number;
  @Input("top-threshold") threshold: number;

  constructor() {
    this.currentTopOffset = window.pageYOffset;
    // console.log("offsetY:"+this.currentTopOffset);
  }

  @HostBinding("class.submit-fixed") get fixBox() {
    return this.currentTopOffset >= this.threshold;
  }

  @HostListener("window:scroll") onScroll() {
    this.currentTopOffset = window.pageYOffset;
    // console.log("offsetY:"+this.currentTopOffset);
  }
}
