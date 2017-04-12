import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";


declare var alert: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ["",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]),
        Validators.composeAsync([
          this.isEmailTaken.bind(this)
        ])],
      password: this.fb.group({
        password1: ["",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15)
          ])],
        password2: [""]
      }, {validator: this.comparePasswords}),
      firstname: ["",
        Validators.compose([
          Validators.required,
          Validators.maxLength(25)
        ])],
      lastname: ["",
        Validators.compose([
          Validators.required,
          Validators.maxLength(25)
        ])]
      // street: [""],
      // suite: [""],
      // city: [""],
      // state: [""],
      // zipcode: [""]
    });
  }


  onSignup() {
    if (this.registerForm.invalid) {
      alert("Invalid Form Values");
      return;
    }
    const account = this.registerForm.value;
    account.firstname = account.firstname.slice(0, 1).toUpperCase() + account.firstname.toLowerCase().slice(1, account.firstname.length);
    account.lastname = account.lastname.slice(0, 1).toUpperCase() + account.lastname.toLowerCase().slice(1, account.lastname.length);
    const password = account.password.password1;
    const confirmedPassword = account.password.password2;
    account.password = password;
    account.confirmedPassword = confirmedPassword;
    this.authService.signUp(account)
      .toPromise()
      .then(data => {
        console.log(data);
        if (data.result == true) {
          this.router.navigateByUrl("/auth/login");
        }
        else {
          alert("Signup Failed!");
        }
      });
  }

  comparePasswords(c: FormControl): any {
    return c.get("password1").value == c.get("password2").value ? null : {samePassword: true};
  }

  isEmailTaken(c: FormControl) {
    return this.authService.isEmailTaken(c.value)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          return {"isTaken": true};
        }
        else {
          return null;
        }
      });
  }

  getEmailError() {
    const email = this.registerForm.get("email");

    if (email.valid || !email.touched) {
      return " ";
    }
    if (email.hasError("pattern")) {
      return "Invalid email address";
    }
    if (email.hasError("required")) {
      return "Email address required";
    }
    if (email.hasError("isTaken")) {
      return "This email is already taken";
    }

  }
}
