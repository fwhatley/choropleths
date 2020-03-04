import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CrimeheatmapComponent} from './crimeheatmap/crimeheatmap.component';
import {HomepriceheatmapComponent} from './homepriceheatmap/homepriceheatmap.component';


const routes: Routes = [
  { path: 'crimeheatmap', component: CrimeheatmapComponent },
  { path: 'homepriceheatmap',      component: HomepriceheatmapComponent },
  // {
  //   path: 'dashboard',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'homepriceheatmap',
  //   redirectTo: '/homepriceheatmap',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'crimeheatmap',
  //   redirectTo: '/crimeheatmap',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
