import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemdetailPageRoutingModule } from './itemdetail-routing.module';

import { ItemdetailPage } from './itemdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemdetailPageRoutingModule
  ],
  declarations: [ItemdetailPage]
})
export class ItemdetailPageModule {}
