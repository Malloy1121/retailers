import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register.component";
import {ReactiveFormsModule} from "@angular/forms";


const REGISTER_ROUTE:Routes=[
  {path:"",component:RegisterComponent},
  {path:"*",redirectTo:"",pathMatch:"full"}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(REGISTER_ROUTE),
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
