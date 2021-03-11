import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TampillistPage } from './tampillist.page';

const routes: Routes = [
  {
    path: '',
    component: TampillistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TampillistPageRoutingModule {}
