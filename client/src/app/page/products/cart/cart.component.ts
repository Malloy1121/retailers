import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

declare var screen: any;
declare var navigator: any;
declare var i: any;

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
  private cartForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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

    this.buildCartForm();

  }

  proceedToCheckout() {
    this.router.navigateByUrl("/products/checkout");
  }

  goToDetail(id) {
    this.router.navigate(["/products/product/"+id]);
  }

  buildCartForm() {
    this.cartForm = this.fb.group({
      items: this.fb.array([
        new FormControl(1, Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+$/),
          this.amountValidator
        ]))
      ])
    });

  }

  amountValidator(c: FormControl) {
    return c.value > 0 && c.value < 100 ? null : {amount: true};
  }
}
