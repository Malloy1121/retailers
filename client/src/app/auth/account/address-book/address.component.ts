import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../model/address";
import "rxjs/Rx";
import {Subscription} from "rxjs";
import {ProfileService} from "../../../service/profile.service";

declare var alert: any;

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
  private states = [];
  private currentAddress: Address = null;
  private routerParamsSubscription: Subscription;
  private title: string = "Add";
  private id: number = -1;

  constructor(private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit() {
    this.profileService.getStateList()
      .toPromise()
      .then(data => {
        const states = data.object;
        this.states = states;
      });

    this.routerParamsSubscription = this.activatedRoute.params
      .subscribe((data: Address) => {
        console.log(data);
        if (data["id"] != null) {
          this.currentAddress = data;
          this.title = "Update";
          if (this.currentAddress.tag == null) {
            this.currentAddress.tag == "";
          }
          this.id = this.currentAddress.id;
          // console.log(this.currentAddress);
        }
        else {
          this.title = "Add a New";
          this.currentAddress = null;
        }
        // this.currentAddress = data;
        this.buildForm();
      });
    // console.log("Address ID : " + this.id);
  }

  onSubmit() {
    const value = this.addressForm.value;
    if (this.id < 0) {
      value.id = this.id;
      this.profileService.addAddress(value)
        .toPromise()
        .then(data => {
          if (data.result == true) {
            this.router.navigateByUrl("/auth/account/my_addresses");
          }
          else {
            alert("Add address failed");
          }
        });
    }
    else {
      value.id=this.id;
      this.profileService.editAddress(value)
        .toPromise()
        .then(data => {
          if (data.result == true) {
            this.router.navigateByUrl("/auth/account/my_addresses");
          }
          else {
            alert("Address update failed");
          }
        });
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
      this.currentAddress == null ? "" : this.currentAddress.stateID, Validators.compose([
        Validators.required
      ]));

    this.zipcode = new FormControl(
      this.currentAddress == null ? "" : this.currentAddress.zipcode, Validators.compose([
        Validators.required
      ]));

    this.suite = new FormControl(this.currentAddress == null ? "" : this.currentAddress.suite);

    this.addressForm = new FormGroup({
      tag: this.addressName,
      zipcode: this.zipcode,
      street: this.street,
      city: this.city,
      stateID: this.state,
      suite: this.suite
    });
  }

  ngOnDestroy(): void {
    this.routerParamsSubscription.unsubscribe();
  }

}
