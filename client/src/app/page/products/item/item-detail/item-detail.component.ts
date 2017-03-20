import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-item-detail',
  templateUrl: 'item-detail.component.html',
  styleUrls: ['item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  private lowestPrice: number = 0.00;
  private highestPrice: number = 100.00;
  private currentCategory: number = -1;
  private amount: FormControl;
  private purchaseForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  amountOnBlur() {

  }

  buildForm() {
    this.amount = new FormControl(1, Validators.compose([
      Validators.required,
      this.amountValidator,
      Validators.pattern(/^\d+$/)
    ]));

    this.purchaseForm = this.fb.group({
      amount: this.amount
    });
  }

  categoryValidator(c: FormControl) {
    return c.value > 0 ? null : {category: true};
  }

  amountValidator(c: FormControl) {
    return c.value > 0 && c.value < 100 ? null : {amount: true};
  }

  onAddToChart() {

  }

}
