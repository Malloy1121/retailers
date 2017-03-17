import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

declare var scrollTo: any;

@Component({
  selector: 'app-payment-book',
  templateUrl: './payment-book.component.html',
  styleUrls: ['./payment-book.component.scss','./payment-edit.scss']
})
export class PaymentBookComponent implements OnInit,OnDestroy {
  private cards: boolean[] = [false];
  private isAddCardOpen: boolean = false;
  private cardForm: FormGroup;
  private months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  private years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];
  private paramsSubscription: Subscription;

  @ViewChild("newCard") newCard: ElementRef;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.buildForm();
    this.paramsSubscription = this.activatedRoute.params.subscribe(data => {
      if (data["id"]) {
        const isNew = data["id"];
        if (data["id"] != "new") {
          return;
        }
        this.isAddCardOpen = true;
        const left = this.newCard.nativeElement.offsetLeft;
        const top = this.newCard.nativeElement.offsetTop;
        console.log(left, top);
        scrollTo(0, top);
      }
    });
  }

  onAdd() {

  }

  onEdit() {
  }

  onRemove(id: number) {
  }

  toggleCard(index: number) {
    this.cards[index] = !this.cards[index];
  }

  toggleAddCard() {
    this.isAddCardOpen = !this.isAddCardOpen;
    if (this.isAddCardOpen) {
      this.buildForm();
    }
  }

  addCard() {

  }

  cardNumberLength(c: FormControl): any {
    const value = c.value;

    if (value.trim().length == 0) {
      return null;
    }
    // if (value.length == 1) {
    //   return {numberLength: true};
    //

    return value.length == 16 ? null : {numberLength: true};
  }

  cardExpired(c: FormControl): any {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const yearValue = c.get("year").value;
    const monthValue = c.get("month").value;

    if (yearValue < year) {
      return {expired: true};
    }
    else if (yearValue == year) {
      if (monthValue < month) {
        return {expired: true};
      }
    }

    return null;
  }

  buildForm() {
    this.cardForm = this.fb.group({
      "name": ["", Validators.compose([
        Validators.required,
        Validators.maxLength(25)
      ])],
      "number": ["", Validators.compose([
        Validators.required,
        this.cardNumberLength
      ])],
      "month": ["", Validators.compose([
        Validators.required
      ])],
      "year": [new Date().getFullYear(), Validators.compose([
        Validators.required
      ])]
    }, {validator: this.cardExpired});
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
