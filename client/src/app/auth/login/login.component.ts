import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginForm: FormGroup;
  private paramsSub: Subscription;
  private forwardUrl: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private actRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      "email": ["", Validators.required],
      "password": ["", Validators.required]
    });

    this.paramsSub = this.actRoute.params.subscribe(data => {
      if (data["url"]) {
        this.forwardUrl = data["url"];
      }
      else {
        this.forwardUrl = null;
      }
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value, this.forwardUrl);
  }

  goToSignup() {
    this.router.navigateByUrl("/auth/register");
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

}
