import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CrimeheatmapComponent} from './crimeheatmap/crimeheatmap.component';
import {HomepriceheatmapComponent} from './homepriceheatmap/homepriceheatmap.component';
import {Crimeheatmapv2Component} from './crimeheatmapv2/crimeheatmapv2.component';
import {Homepriceheatmapv2Component} from './homepriceheatmapv2/homepriceheatmapv2.component';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'crimeheatmap', component: CrimeheatmapComponent },
  { path: 'homepriceheatmap',      component: HomepriceheatmapComponent },
  { path: 'crimeheatmapv2',      component: Crimeheatmapv2Component },
  { path: 'homepriceheatmapv2',      component: Homepriceheatmapv2Component },
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
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
