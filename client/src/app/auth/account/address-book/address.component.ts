import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Address} from "../../../model/address";
import "rxjs/Rx";
import {Subscription} from "rxjs";
import {ProfileService} from "../../../service/profile.service";

@Component({
  selector: 'app-address',
  templateUrl: 'address.component.html',
  styleUrls: ['address.component.scss']
})
export class AddressComponent implements OnInit,OnDestroy {
  private addressForm: FormGroup;
  private addressName: FormControl;
  private street: FormControl;
  private city: FormControl;
  private state: FormControl;
  private zipcode: FormControl;
  private suite: FormControl;
  private states = ["VA", "NY", "PA"];
  private currentAddress: Address = null;
  private routerParamsSubscription: Subscription;
  private title: string = "Add";
  private id: number = -1;

  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService) {
  }

  ngOnInit() {
    this.routerParamsSubscription = this.activatedRoute.params
      .subscribe((data: Address) => {
        console.log(data);
        if (data["id"] != null) {
          this.currentAddress = data;
          this.title = "Update";
          this.id = data["id"];
          console.log(this.currentAddress);
        }
        else {
          this.title = "Add";
          this.currentAddress = null;
        }
        // this.currentAddress = data;
        this.buildForm();
      });

  }

  onSubmit() {
    const value = this.addressForm.value;
    if (this.id >= 0) {
      value.id = this.id;
      this.profileService.updateProfile(value);
    }
    else {
      this.profileService.addAddress(value);
    }

  }

  buildForm() {
    this.addressName = new FormControl(
      this.currentAddress == null ? "" : this.currentAddress.tag, Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ]));

    this.street = new FormControl(
      this.currentAddress == null ? "" : this.currentAddress.street, Validators.compose([
        Validators.required
      ]));

    this.city = new FormControl(
      this.currentAddress == null ? "" : this.currentAddress.city, Validators.compose([
        Validators.required
      ]));

    this.state = new FormControl(
      this.currentAddress == null ? "" : this.currentAddress.state, Validators.compose([
        Validators.required
      ]));

    this.zipcode = new FormControl(
      this.currentAddress == null ? "" : this.currentAddress.zipcode, Validators.compose([
        Validators.required
      ]));

    this.suite = new FormControl(this.currentAddress == null ? "" : this.currentAddress.suite);

    this.addressForm = new FormGroup({
      name: this.addressName,
      zipcode: this.zipcode,
      street: this.street,
      city: this.city,
      state: this.state,
      suite: this.suite
    });
  }

  ngOnDestroy(): void {
    this.routerParamsSubscription.unsubscribe();
  }

}
