import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ProfileService} from "../../../../service/profile.service";
import "rxjs/Rx";
import {AuthService} from "../../../../service/auth.service";

declare var alert: any;

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
  private currentLastname = "";

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
        this.currentFirstname = user.firstname;
        this.lastname = user.lastname;
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
    this.profileService.updateProfile(this.profileForm.value)
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
    this.firstname = new FormControl(this.currentFirstname, Validators.compose([
      Validators.required,
      Validators.maxLength(25)
    ]));
    this.lastname = new FormControl(this.currentLastname, Validators.compose([
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
