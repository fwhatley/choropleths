import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  public constructor(private  httpClient: HttpClient) {}

  // https://stackoverflow.com/questions/46991237/how-to-import-json-file-into-a-typescript-file
  // how to read json from local
  public getStatePrices(): Observable<any> {
    return this.httpClient.get('/assets/statePrices.geojson');
  }

  public getCountyPrices(): Observable<any> {
    return this.httpClient.get('/assets/countyPrices.geojson');
  }

  public getParcelPrices(): Observable<any> {
    return this.httpClient.get('/assets/parcelPrices.geojson');
  }

  public getCountyCrime(): Observable<any> {
    return this.httpClient.get('/assets/countyCrime.geojson');
  }
}
