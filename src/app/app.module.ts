import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { CrimeheatmapComponent } from './crimeheatmap/crimeheatmap.component';
import { HomepriceheatmapComponent } from './homepriceheatmap/homepriceheatmap.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Crimeheatmapv2Component } from './crimeheatmapv2/crimeheatmapv2.component';
import { Homepriceheatmapv2Component } from './homepriceheatmapv2/homepriceheatmapv2.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CrimeheatmapComponent,
    HomepriceheatmapComponent,
    DashboardComponent,
    Crimeheatmapv2Component,
    Homepriceheatmapv2Component,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
