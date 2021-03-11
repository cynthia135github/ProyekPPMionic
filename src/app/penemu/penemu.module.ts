import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenemuPageRoutingModule } from './penemu-routing.module';

import { PenemuPage } from './penemu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenemuPageRoutingModule
  ],
  declarations: [PenemuPage]
})
export class PenemuPageModule {}
