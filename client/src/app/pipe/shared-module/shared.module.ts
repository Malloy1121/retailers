import {NgModule} from '@angular/core';
import {Last4DigitsPipe} from "../last-4-digits.pipe";
import {YearPipe} from "../year.pipe";
import {PaginationComponent} from "../../page/pagination/pagination.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Last4DigitsPipe,
    YearPipe,
    PaginationComponent
  ],
  exports: [
    Last4DigitsPipe,
    YearPipe,
    PaginationComponent,
    CommonModule
  ]
})
export class SharedModule {
}
