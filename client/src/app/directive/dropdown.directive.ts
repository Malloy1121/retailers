import {Directive, ElementRef, Input, HostListener, HostBinding} from '@angular/core';

declare var window: any;

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input("appDropdown") private fromRight: number;
  private width: number;

  constructor() {
    this.width = window.innerWidth;
  }

  @HostListener('window:resize') onResize() {
    this.width = window.innerWidth;

  }

  @HostBinding("style.left") get left() {
    if (this.width < 1000)
      return 1000 - this.fromRight + "px";
    return this.width - this.fromRight + "px";
  }

}
