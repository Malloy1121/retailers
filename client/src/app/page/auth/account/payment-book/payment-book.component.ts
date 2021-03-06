import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Payment} from "../../../../model/payment";
import {Address} from "../../../../model/address";
import {ProfileService} from "../../../../service/profile.service";

declare var scrollTo: any;
declare var window: any;
declare var document: any;
declare var alert: any;

@Component({
  selector: 'app-payment-book',
  templateUrl: './payment-book.component.html',
  styleUrls: ['./payment-book.component.scss', './payment-edit.scss']
})
export class PaymentBookComponent implements OnInit, OnDestroy {
  public payments: Payment[];
  public currentPaymentNumber: any = "";
  public isAddCardOpen: boolean = false;
  public months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  public years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];
  private paramsSubscription: Subscription;
  public editMode: boolean = false;

  public paymentForm: FormGroup;
  public nameEdit: FormControl;
  public monthEdit: FormControl;
  public yearEdit: FormControl;
  public streetEdit: FormControl;
  public cityEdit: FormControl;
  public stateEdit: FormControl;
  public zipcodeEdit: FormControl;
  public suiteEdit: FormControl;
  public states = [];

  public cardForm: FormGroup;
  public name: FormControl;
  public number: FormControl;
  public month: FormControl;
  public year: FormControl;
  public street: FormControl;
  public city: FormControl;
  public state: FormControl;
  public zipcode: FormControl;
  public suite: FormControl;
  public currentAddress: Address = null;
  public id: number = -1;


  @ViewChild("newCard") newCard: ElementRef;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.loadPayments();

    this.profileService.getStateList()
      .toPromise()
      .then(data => {
        const states = data.object;
        this.states = states;
      });

    this.buildForm();
    this.buildEditForm();
    this.paramsSubscription = this.activatedRoute.params.subscribe(data => {
      if (data["id"]) {
        const isNew = data["id"];
        if (data["id"] != "new") {
          return;
        }
        this.isAddCardOpen = true;
        const left = this.newCard.nativeElement.offsetLeft;
        const top = this.newCard.nativeElement.offsetTop;
        // console.log(left, top);
        scrollTo(0, top);
      }
    });
  }

  loadPayments() {
    this.profileService.getUserPayment()
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.payments = data.object;

          for (let payment of this.payments) {
            if (payment.isPrimary) {
              const first = this.payments.splice(0, this.payments.indexOf(payment));
              const last = this.payments.splice(this.payments.indexOf(payment) + 1, this.payments.length);
              this.payments = [payment].concat(first).concat(last);
              break;
            }
          }
        }
      });

  }

  onAdd() {
    if (this.cardForm.invalid) {
      alert("Invalid form values!");
      return;
    }
    const value = this.cardForm.value;
    this.profileService.addPayment(value)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.loadPayments();
          this.cardForm.reset();
        }
      });
  }

  onEdit() {
    const value = this.paymentForm.value;
    value.id = this.currentPaymentNumber;
    this.profileService.editPayment(value)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.loadPayments();
          this.closeEdit();
        }
      })
  }

  onRemove(payment: Payment) {
    this.profileService.deletePayment(payment)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.loadPayments();
        }
      });
  }

  toggleCard(payment: Payment) {
    payment.isOpen = !payment.isOpen;
    console.log(window.innerWidth, document.documentElement.clientWidth);
  }

  openEdit(payment: Payment) {
    this.nameEdit.setValue(payment.name);
    this.monthEdit.setValue(payment.month);
    this.yearEdit.setValue(payment.year);
    this.streetEdit.setValue(payment.street);
    this.cityEdit.setValue(payment.city);
    this.stateEdit.setValue(payment.stateID);
    this.zipcodeEdit.setValue(payment.zipcode);
    this.suiteEdit.setValue(payment.suite);
    this.currentPaymentNumber = payment.id;
    this.editMode = true;
  }

  closeEdit() {
    this.editMode = false;
    this.cardForm.reset();
    this.currentPaymentNumber = "";
  }

  toggleAddCard() {
    this.isAddCardOpen = !this.isAddCardOpen;
    if (this.isAddCardOpen) {
      this.buildForm();
    }
    if (this.isAddCardOpen) {
      const left = this.newCard.nativeElement.offsetLeft;
      const top = this.newCard.nativeElement.offsetTop;
      console.log(left, top);
      window.scrollTo(0, top + 500);
    }
  }

  cardNumberLength(c: FormControl): any {
    const value = c.value;

    if (value == null || value.length == 0) {
      return null;
    }

    else if (value.trim().length == 0) {
      return null;
    }

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
    this.name = new FormControl("", Validators.compose([
      Validators.required,
      Validators.maxLength(25)
    ]));

    this.number = new FormControl("", Validators.compose([
      Validators.required,
      Validators.pattern(/[0-9]{16}/)
    ]));

    this.month = new FormControl("", Validators.compose([
      Validators.required
    ]));

    this.year = new FormControl(new Date().getFullYear(), Validators.compose([
      Validators.required
    ]));

    this.street = new FormControl(
      "", Validators.compose([
        Validators.required
      ]));

    this.city = new FormControl(
      "", Validators.compose([
        Validators.required
      ]));

    this.state = new FormControl(
      "", Validators.compose([
        Validators.required
      ]));

    this.zipcode = new FormControl(
      "", Validators.compose([
        Validators.required
      ]));

    this.suite = new FormControl(this.currentAddress == null ? "" : this.currentAddress.suite);

    this.cardForm = this.fb.group({
      "name": this.name,
      "number": this.number,
      "month": this.month,
      "year": this.year,
      "street": this.street,
      "suite": this.suite,
      "city": this.city,
      "stateID": this.state,
      "zipcode": this.zipcode
    }, {validator: this.cardExpired});
  }

  buildEditForm() {
    this.nameEdit = new FormControl("", Validators.compose([
      Validators.required,
      Validators.maxLength(25)
    ]));

    this.monthEdit = new FormControl("", Validators.compose([
      Validators.required
    ]));

    this.yearEdit = new FormControl(new Date().getFullYear(), Validators.compose([
      Validators.required
    ]));

    this.streetEdit = new FormControl(
      "", Validators.compose([
        Validators.required
      ]));

    this.cityEdit = new FormControl(
      "", Validators.compose([
        Validators.required
      ]));

    this.stateEdit = new FormControl(
      "", Validators.compose([
        Validators.required
      ]));

    this.zipcodeEdit = new FormControl(
      "", Validators.compose([
        Validators.required
      ]));

    this.suiteEdit = new FormControl(this.currentAddress == null ? "" : this.currentAddress.suite);

    this.paymentForm = this.fb.group({
      zipcode: this.zipcodeEdit,
      street: this.streetEdit,
      city: this.cityEdit,
      stateID: this.stateEdit,
      suite: this.suiteEdit,
      name: this.nameEdit,
      month: this.monthEdit,
      year: this.yearEdit
    }, {validator: this.cardExpired});
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onSetDefault(payment) {
    this.profileService.setPaymentToDefault(payment)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.loadPayments();
        }
        else {
          alert("Request failed! Please try again later!");
        }
      })
  }

}
