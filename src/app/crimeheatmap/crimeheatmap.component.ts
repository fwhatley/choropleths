import { Component, OnInit } from '@angular/core';
import {MapboxService} from '../mapbox.service';
import {environment} from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-crimeheatmap',
  templateUrl: './crimeheatmap.component.html',
  styleUrls: ['./crimeheatmap.component.css']
})
export class CrimeheatmapComponent implements OnInit {
  public map: mapboxgl.Map;
  public style = 'mapbox://styles/fredywhatley/ck7pnfhok06sp1imcsfxhul7x';
  public lat = 33.774830;
  public lng = -84.296310;
  public initialZoom = 10;

  public source: any;
  public countyCrimesData: any = null;
  public countyCrimesId = 'countyCrimesId';
  public maxZoomLevels = {
    county: 20,
  };

  constructor(private mapboxService: MapboxService) {}

  public ngOnInit() {
    this.mapboxService.getGeoJsonDataFromFile('/assets/countyCrime_processed.geojson').subscribe((res) => {
      this.countyCrimesData = res;
      this.setMapStuff();
    }, ( err ) => { console.log(err); });
  }

  public setMapStuff() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      minZoom: 3,
      maxZoom: 20,
      zoom: this.initialZoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    // this.map.on('load', (result: any) => {
    //   result.target.addSource(this.countyCrimesId, this.mapboxService.getGeojsonInitObject());
    //
    //   this.source = this.map.getSource(this.countyCrimesId);
    //   this.source.setData(this.countyCrimesData);
    //   // this.source.setData('mapbox://styles/fredywhatley/ck76y8f6c1dir1it09act1qo8');
    //
    //   this.addCountyHeatmap();
    // });
    //
    // // adding zoom
    // const zoomThreshold = 4;
    // const countyLegendEl = document.getElementById('county-legend');
    // this.map.on('zoom', () => {
    //   if (this.map.getZoom() > zoomThreshold) {
    //     countyLegendEl.style.display = 'block';
    //   } else {
    //     countyLegendEl.style.display = 'none';
    //   }
    // });

  }

  public addCountyHeatmap() {
    this.map.addLayer({
      id: this.countyCrimesId,
      source: this.countyCrimesId,
      minzoom: 0,
      maxzoom: this.maxZoomLevels.county,
      type: 'fill',
      paint: this.mapboxService.getCrimePaint()
    });
  }
}
