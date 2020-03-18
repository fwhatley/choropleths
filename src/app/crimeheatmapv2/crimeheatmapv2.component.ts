import { Component, OnInit } from '@angular/core';
import {MapboxService} from '../mapbox.service';
import {environment} from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-crimeheatmapv2',
  templateUrl: './crimeheatmapv2.component.html',
  styleUrls: ['./crimeheatmapv2.component.css']
})
export class Crimeheatmapv2Component implements OnInit {
  public map: mapboxgl.Map;
  public style = 'mapbox://styles/fredywhatley/ck76y8f6c1dir1it09act1qo8';
  public lat = 33.7490;
  public lng = -84.3880;

  public source: any;
  public countyCrimesData: any = null;
  public countyCrimesId = 'countyCrimesId';
  public maxZoomLevels = {
    county: 22,
  };

  constructor(private mapboxService: MapboxService) {}

  public ngOnInit() {
    this.mapboxService.getCountyCrime().subscribe((res) => {
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
      zoom: 8,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (result: any) => {
      result.target.addSource(this.countyCrimesId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      this.source = this.map.getSource(this.countyCrimesId);
      this.source.setData(this.countyCrimesData);

      this.addLayersToMap();
    });

    // adding zoom
    const zoomThreshold = 4;
    const countyLegendEl = document.getElementById('county-legend');
    this.map.on('zoom', () => {
      if (this.map.getZoom() > zoomThreshold) {
        countyLegendEl.style.display = 'block';
      } else {
        countyLegendEl.style.display = 'none';
      }
    });

  }

  public addLayersToMap() {

    // county level crime
    this.map.addLayer({
      id: this.countyCrimesId,
      source: this.countyCrimesId,
      minzoom: 0,
      maxzoom: this.maxZoomLevels.county,
      type: 'fill',
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'CENSUSAREA'],
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
  }
}
