import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ProfileService} from "../../../../service/profile.service";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit,OnDestroy {
  private index = 1;
  private subscription: Subscription;
  private profileForm: FormGroup;
  private passwordForm: FormGroup;
  private currentPassword: FormControl;
  private newPassword: FormControl;
  private newPasswordConfirm: FormControl;
  private firstname: FormControl;
  private lastname: FormControl;
  private currentFirstname = "";
  private curreentLastname = "";

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,private profileService:ProfileService) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((data: Params) => {
      this.index = data["index"];
    });
    console.log(this.index);
    this.buildProfileForm();
    this.buildPasswordForm();
  }

  updateOnSwitch(index) {
    this.index = index;
  }

  changePassword() {
    this.profileService.changePassword(this.passwordForm.value);
  }

  updateProfile() {
    this.profileService.updateProfile(this.profileForm.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buildProfileForm() {
    this.firstname = new FormControl(this.currentFirstname, Validators.compose([
      Validators.required,
      Validators.maxLength(25)
    ]));
    this.lastname = new FormControl(this.curreentLastname, Validators.compose([
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
    this.newPassword = new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]));
    this.newPasswordConfirm = new FormControl(
      "",
      Validators.compose([
        Validators.required
      ]));
    this.passwordForm = this.fb.group({
      currentPassword: this.currentPassword,
      password: this.newPassword,
      confirmedPassword: this.newPasswordConfirm
    }, {validator: this.comparePasswords.bind(this)});
  }

  comparePasswords(c: FormControl): any {
    return c.get("password").value == c.get("confirmedPassword").value ? null : {samePassword: true};
  }

}
