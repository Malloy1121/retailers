import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItemListComponent, ItemDetailComponent]
})
export class ItemModule { }
