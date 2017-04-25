import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ProfileService} from "../../../../../service/profile.service";
import {AuthService} from "../../../../../service/auth.service";

declare var alert: any;

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit,OnDestroy {
  public index = 1;
  private subscription: Subscription;
  public profileForm: FormGroup;
  public passwordForm: FormGroup;
  public currentPassword: FormControl;
  public password: FormControl;
  public confirmedPassword: FormControl;
  public firstname: FormControl;
  public lastname: FormControl;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private profileService: ProfileService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((data: Params) => {
      this.index = data["index"];
    });
    console.log(this.index);
    this.buildProfileForm();
    this.buildPasswordForm();
    this.authService.getCurrentUser()
      .toPromise()
      .then(data => {
        const user = data.object;
        this.lastname.setValue(user.lastname);
        this.firstname.setValue(user.firstname);
      });
  }

  updateOnSwitch(index) {
    this.index = index;
  }

  changePassword() {
    this.profileService.changePassword(this.passwordForm.value)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.router.navigateByUrl("/auth/account");
        }
        else {
          alert("Request failed due to: " + data.info);
        }
      });
  }

  updateProfile() {
    const value=this.profileForm.value;
    value.firstname = value.firstname.slice(0, 1).toUpperCase() + value.firstname.toLowerCase().slice(1, value.firstname.length);
    value.lastname = value.lastname.slice(0, 1).toUpperCase() + value.lastname.toLowerCase().slice(1, value.lastname.length);

    this.profileService.updateProfile(value)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.router.navigateByUrl("/auth/account");
        }
        else {
          alert("Request failed");
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buildProfileForm() {
    this.firstname = new FormControl("", Validators.compose([
      Validators.required,
      Validators.maxLength(25)
    ]));
    this.lastname = new FormControl("", Validators.compose([
      Validators.required,
      Validators.maxLength(25)
    ]));
    this.profileForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname
    });
  }

  buildPasswordForm() {
    this.currentPassword = new FormControl("", Validators.compose([Validators.required]));
    this.password = new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]));
    this.confirmedPassword = new FormControl(
      "",
      Validators.compose([
        Validators.required
      ]));
    this.passwordForm = this.fb.group({
      currentPassword: this.currentPassword,
      password: this.password,
      confirmedPassword: this.confirmedPassword
    }, {validator: this.comparePasswords.bind(this)});
  }

  comparePasswords(c: FormControl): any {
    return c.get("password").value == c.get("confirmedPassword").value ? null : {samePassword: true};
  }

}
