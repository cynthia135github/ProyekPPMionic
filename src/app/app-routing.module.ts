import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'lostform',
    loadChildren: () => import('./lostform/lostform.module').then( m => m.LostformPageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'listbarang',
    loadChildren: () => import('./listbarang/listbarang.module').then( m => m.ListbarangPageModule)
  },
  {
    path: 'itemdetail',
    loadChildren: () => import('./itemdetail/itemdetail.module').then( m => m.ItemdetailPageModule)
  },
  {
    path: 'penemu',
    loadChildren: () => import('./penemu/penemu.module').then( m => m.PenemuPageModule)
  },
  {
    path: 'tampillist',
    loadChildren: () => import('./tampillist/tampillist.module').then( m => m.TampillistPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
