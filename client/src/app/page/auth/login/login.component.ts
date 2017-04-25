import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Response} from "@angular/http";
import {Subscription} from "rxjs";
import {AuthService} from "../../../service/auth.service";
import {MyEmitService} from "../../../service/emit.service";
import {CartService} from "../../../service/cart.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private paramsSub: Subscription;
  private forwardUrl: string;
  public loginFailed: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private actRoute: ActivatedRoute,
              private emitService: MyEmitService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      "email": ["", Validators.required],
      "password": ["", Validators.required]
    });

    this.paramsSub = this.actRoute.queryParams.subscribe(data => {
      if (data["url"]) {
        this.forwardUrl = data["url"];
      }
      else {
        this.forwardUrl = null;
      }
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.authService.currentUser = data.object;
          this.emitService.userStatusSubject.next(data.object);
          this.cartService.updateCartItemAmount();
          if (this.forwardUrl == null) {
            this.router.navigateByUrl("/");
          }
          else {
            this.router.navigateByUrl(this.forwardUrl);
          }
          return data;
        }
        else {
          this.loginFailed = true;
        }
      })
      .catch((error: Response) => {
        console.log(error.json().error);
      });
  }

  goToSignup() {
    this.router.navigateByUrl("/auth/register");
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

}
