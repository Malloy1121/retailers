import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from "@angular/router";
import {AUTH_ROUTE} from "./auth.route";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AUTH_ROUTE),
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
