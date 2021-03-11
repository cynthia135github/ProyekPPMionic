import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TampillistPageRoutingModule } from './tampillist-routing.module';

import { TampillistPage } from './tampillist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TampillistPageRoutingModule
  ],
  declarations: [TampillistPage]
})
export class TampillistPageModule {}
