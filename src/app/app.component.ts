import {Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MapboxService} from './mapbox.service';
import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'mapbox';
  public map: mapboxgl.Map;
  public style = 'mapbox://styles/fredywhatley/ck7722mza5llw1inkkatcz12e';
  public lat = 35.00118;
  public lng = -87.359296;

  public source: any;
  public usaStatesData: any = null;
  public usaCountiesData: any = null;
  public usaStatesDataId = 'usaStatesDataId';
  public usaCountiesDataId = 'usaCountiesDataId';

  constructor(private mapboxService: MapboxService) {}

  public ngOnInit() {
    this.mapboxService.getUsaStates().subscribe((statesRes) => {

      this.usaStatesData = statesRes;
      this.mapboxService.getCountyPopulations().subscribe((countiesRes) => {
        this.usaCountiesData = countiesRes;
        this.setMapStuff();
      },
        (err) => { console.log(err); });

    },
      (err) => { console.log(err); });
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
      result.target.addSource(this.usaStatesDataId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      result.target.addSource(this.usaCountiesDataId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      this.source = this.map.getSource(this.usaStatesDataId);
      this.source.setData(this.usaStatesData);

      this.source = this.map.getSource(this.usaCountiesDataId);
      this.source.setData(this.usaCountiesData);

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
    const zoomThreshold = 4;

    this.map.addLayer({
      id: this.usaStatesDataId,
      source: this.usaStatesDataId,
      maxzoom: zoomThreshold,
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

    this.map.addLayer({
      id: this.usaCountiesDataId,
      source: this.usaCountiesDataId,
      minzoom: zoomThreshold,
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
  }

}
