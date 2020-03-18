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
  // public style = 'mapbox://styles/fredywhatley/ck7722mza5llw1inkkatcz12e';
  public style = 'mapbox://styles/fredywhatley/ck7pnfhok06sp1imcsfxhul7x';
  public lat = 33.774830;
  public lng = -84.296310;
  public initialZoom = 16;

  public source: any;
  public statePricesData: any = null;
  public countyPricesData: any = null;
  public neighborhoodPriceData: any = null;
  public parcelPricesData: any = null;
  public statePricesId = 'statePricesId';
  public countyPricesId = 'countyPricesId';
  public neighborhoodPricesId = 'neighborhoodPricesId';
  public parcelPricesId = 'parcelPricesId';
  public maxZoomLevels = {
    state: 7,
    county: 11,
    neighborhood: 15,
    parcel: 22 // 22 is the highest zoom level
  };

  constructor(private mapboxService: MapboxService) {}

  public ngOnInit() {
    this.mapboxService.getGeoJsonDataFromFile('/assets/statePrices_processed.geojson').subscribe((statesRes) => {
      this.statePricesData = statesRes;
      this.mapboxService.getGeoJsonDataFromFile('/assets/countyPrices_processed.geojson').subscribe((countiesRes) => {
        this.countyPricesData = countiesRes;
        this.mapboxService.getGeoJsonDataFromFile('/assets/neighborhood_n3_processed.geojson').subscribe((neighborhoodRes) => {
          this.neighborhoodPriceData = neighborhoodRes;
          this.mapboxService.getGeoJsonDataFromFile('/assets/parcels/ga_dekalb_processed.geojson').subscribe( (parcelsRes) => {

            this.parcelPricesData = parcelsRes;
            this.setMapStuff();

          },  ( err ) => { console.log(err); });
        }, (err) => { console.log(err); });
      }, ( err ) => { console.log(err); });
    }, ( err ) => { console.log(err); });
  }

  public setMapStuff() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      minZoom: 3,
      maxZoom: 18,
      zoom: this.initialZoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (result: any) => {
      result.target.addSource(this.statePricesId, this.mapboxService.getGeojsonInitObject());
      result.target.addSource(this.countyPricesId, this.mapboxService.getGeojsonInitObject());
      result.target.addSource(this.neighborhoodPricesId, this.mapboxService.getGeojsonInitObject());
      result.target.addSource(this.parcelPricesId, this.mapboxService.getGeojsonInitObject());

      this.source = this.map.getSource(this.statePricesId);
      this.source.setData(this.statePricesData);

      this.source = this.map.getSource(this.countyPricesId);
      this.source.setData(this.countyPricesData);

      this.source = this.map.getSource(this.neighborhoodPricesId);
      this.source.setData(this.neighborhoodPriceData);

      this.source = this.map.getSource(this.parcelPricesId);
      this.source.setData(this.parcelPricesData);

      // this.addLayersToMap();
      this.addStateLayer();
      this.addCountyLayer();
      this.addNeighborhoodLayer();
      this.addParcelLayer();
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

  public addStateLayer() {
    this.map.addLayer({
      id: this.statePricesId,
      source: this.statePricesId,
      minzoom: 0,
      maxzoom: this.maxZoomLevels.state,
      type: 'fill',
      paint: this.mapboxService.getPricePaint()
    });
  }

  public addCountyLayer() {
    this.map.addLayer({
      id: this.countyPricesId,
      source: this.countyPricesId,
      minzoom: this.maxZoomLevels.state,
      maxzoom: this.maxZoomLevels.county,
      type: 'fill',
      paint: this.mapboxService.getPricePaint()
    });
  }

  public addNeighborhoodLayer() {
    this.map.addLayer({
      id: this.neighborhoodPricesId,
      source: this.neighborhoodPricesId,
      minzoom: this.maxZoomLevels.county,
      maxzoom: this.maxZoomLevels.neighborhood,
      type: 'fill',
      paint: this.mapboxService.getPricePaint()
    });
  }

  public addParcelLayer() {
    this.map.addLayer({
      id: this.parcelPricesId,
      source: this.parcelPricesId,
      minzoom: this.maxZoomLevels.neighborhood,
      maxzoom: this.maxZoomLevels.parcel,
      type: 'fill',
      paint: this.mapboxService.getPricePaint()
    });
  }

}
