import { Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";

export const AUTH_ROUTE:Routes=[
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register",loadChildren:"./register/register.module#RegisterModule"},
  {path:"account",loadChildren:"./account/account.module#AccountModule"},
  {path:"*",redirectTo:"login",pathMatch:"full"}
];
