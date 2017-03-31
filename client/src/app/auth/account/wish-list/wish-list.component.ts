import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss',"../../../page/products/cart/cart.component.scss"]
})
export class WishListComponent implements OnInit {
  private wishListForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildWishListForm();
  }

  addToCart(id) {

  }

  removeOne(id){

  }

  addAllToCart(){

  }

  removeAll(){

  }

  goToDetail(id) {
    this.router.navigate(["/products/product/" + id]);
  }

  buildWishListForm() {
    this.wishListForm = this.fb.group({
      items: this.fb.array([
        new FormControl(1, Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+$/),
          this.amountValidator
        ])),
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
