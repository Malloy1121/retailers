import {HomeComponent} from "./page/home.component";
import {Routes} from "@angular/router";

export const APP_ROUTE:Routes=[
  {path:"",component:HomeComponent},
  {path:"auth",loadChildren:"./auth/auth.module#AuthModule"},
  {path:"shp",loadChildren:"./page/products/products.module#ProductsModule"},
  {path:"**",redirectTo:"",pathMatch:"full"}
];
