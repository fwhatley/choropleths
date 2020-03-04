import { Component, OnInit } from '@angular/core';
import {MapboxService} from '../mapbox.service';
import {environment} from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-homepriceheatmap',
  templateUrl: './homepriceheatmap.component.html',
  styleUrls: ['./homepriceheatmap.component.css']
})
export class HomepriceheatmapComponent implements OnInit {
  public map: mapboxgl.Map;
  public style = 'mapbox://styles/fredywhatley/ck7722mza5llw1inkkatcz12e';
  public lat = 35.00118;
  public lng = -87.359296;

  public source: any;
  public statePricesData: any = null;
  public countyPricesData: any = null;
  public parcelPricesData: any = null;
  public statePricesId = 'statePricesId';
  public countyPricesId = 'countyPricesId';
  public parcelPricesId = 'parcelPricesId';
  public maxZoomLevels = {
    state: 5,
    county: 8,
    parcel: 22 // 22 is the highest zoom level
  };


  constructor(private mapboxService: MapboxService) {}

  public ngOnInit() {
    this.mapboxService.getStatePrices().subscribe((statesRes) => {
      this.statePricesData = statesRes;
      this.mapboxService.getCountyPrices().subscribe((countiesRes) => {
        this.countyPricesData = countiesRes;
        this.mapboxService.getParcelPrices().subscribe( (parcelsRes) => {

          this.parcelPricesData = parcelsRes;
          this.setMapStuff();

        },  ( err ) => { console.log(err); });
      }, ( err ) => { console.log(err); });
    }, ( err ) => { console.log(err); });
  }

  public setMapStuff() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      minZoom: 3,
      zoom: 3,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (result: any) => {
      result.target.addSource(this.statePricesId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      result.target.addSource(this.countyPricesId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      result.target.addSource(this.parcelPricesId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      this.source = this.map.getSource(this.statePricesId);
      this.source.setData(this.statePricesData);

      this.source = this.map.getSource(this.countyPricesId);
      this.source.setData(this.countyPricesData);

      this.source = this.map.getSource(this.parcelPricesId);
      this.source.setData(this.parcelPricesData);

      this.addLayersToMap();
    });

    // adding zoom
    const zoomThreshold = 4;
    const stateLegendEl = document.getElementById('state-legend');
    const countyLegendEl = document.getElementById('county-legend');
    this.map.on('zoom', () => {
      if (this.map.getZoom() > zoomThreshold) {
        stateLegendEl.style.display = 'none';
        countyLegendEl.style.display = 'block';
      } else {
        stateLegendEl.style.display = 'block';
        countyLegendEl.style.display = 'none';
      }
    });

  }

  public addLayersToMap() {

    // state
    this.map.addLayer({
      id: this.statePricesId,
      source: this.statePricesId,
      minzoom: 0,
      maxzoom: this.maxZoomLevels.state,
      type: 'fill',
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'density'],
          0,
          '#F2F12D',
          50,
          '#EED322',
          100,
          '#E6B71E',
          200,
          '#DA9C20',
          300,
          '#CA8323',
          400,
          '#B86B25',
          500,
          '#A25626',
          600,
          '#8B4225',
          700,
          '#723122'
        ],
        'fill-opacity': 0.75
      }
    });

    // county
    this.map.addLayer({
      id: this.countyPricesId,
      source: this.countyPricesId,
      minzoom: this.maxZoomLevels.state,
      maxzoom: this.maxZoomLevels.county,
      type: 'fill',
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'CENSUSAREA'],
          0,
          '#F2F12D',
          100,
          '#EED322',
          1000,
          '#E6B71E',
          5000,
          '#DA9C20',
          10000,
          '#CA8323',
          20000,
          '#B86B25',
          25000,
          '#A25626',
          30000,
          '#8B4225',
          34000,
          '#723122'
        ],
        'fill-opacity': 0.75
      }
    });

    // parcel
    this.map.addLayer({
      id: this.parcelPricesId,
      source: this.parcelPricesId,
      minzoom: this.maxZoomLevels.county,
      maxzoom: this.maxZoomLevels.parcel,
      type: 'fill',
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'value'],
          0,
          '#F2F12D',
          100,
          '#EED322',
          1000,
          '#E6B71E',
          5000,
          '#DA9C20',
          10000,
          '#CA8323',
          20000,
          '#B86B25',
          25000,
          '#A25626',
          30000,
          '#8B4225',
          34000,
          '#723122'
        ],
        'fill-opacity': 0.75
      }
    });
  }

}
