import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenemuPage } from './penemu.page';

const routes: Routes = [
  {
    path: '',
    component: PenemuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenemuPageRoutingModule {}
