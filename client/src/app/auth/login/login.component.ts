import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private authService:AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      "email": ["", Validators.required],
      "password": ["", Validators.required]
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }

  goToSignup() {
    this.router.navigateByUrl("/auth/register");
  }

}
