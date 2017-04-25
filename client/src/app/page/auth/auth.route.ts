import { Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "../../service/auth.guard";


export const AUTH_ROUTE:Routes=[
  {path:"",redirectTo:"account",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register",loadChildren:"./register/register.module#RegisterModule"},
  {path:"account",loadChildren:"./account/account.module#AccountModule",canActivate:[AuthGuard],canActivateChild:[AuthGuard]},
  {path:"*",redirectTo:"account",pathMatch:"full"}
];
