import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-homepriceheatmapv2',
  templateUrl: './homepriceheatmapv2.component.html',
  styleUrls: ['./homepriceheatmapv2.component.css']
})
export class Homepriceheatmapv2Component implements OnInit {

  public map: mapboxgl.Map;
  // public style = 'mapbox://styles/fredywhatley/ck7722mza5llw1inkkatcz12e';
  public style = 'mapbox://styles/fredywhatley/ck7y99cfu02n41imn9j1d27yf';
  public lat = 33.774830;
  public lng = -84.296310;
  public initialZoom = 15;

  public address: any;
  public formattedAddress: any;
  public zone: any;

  // Create a popup, but don't add it to the map yet.
  private popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  constructor() { }
  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: this.initialZoom,
      center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // this.map.on('mouseenter', 'allparcels', (e) => {
      // Change the cursor style as a UI indicator.
      // this.map.getCanvas().style.cursor = 'pointer';
      //
      // let coordinates: any = null;
      // let value = '';
      // if (e.features[0].geometry.type === 'Polygon') {
      //   coordinates = e.features[0].geometry.coordinates.slice();
      //   value = e.features[0].properties.value;
      // }

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      // let pointcordinates: any = null;
      // while (Math.abs(e.lngLat.lng - coordinates[0][0]) > 180) {
      //   pointcordinates += e.lngLat.lng > coordinates[0][0] ? 360 : -360;
      // }

      // Populate the popup and set its coordinates
      // based on the feature found.
      // if (coordinates && coordinates[0] && coordinates[0][0]) {
      //   this.popup
      //     .setLngLat(coordinates[0][0])
      //     .setHTML(value)
      //     .addTo(this.map);
      // }

    // });

    // this.map.on('mouseleave', 'allparcels', () => {
    //   this.map.getCanvas().style.cursor = '';
    //   this.popup.remove();
    // });

  }

  public placePopup(lat: number, lng: number, value = 'This is here') {
    this.map.setCenter({ lat, lng });

    this.popup
    .setLngLat({ lat, lng })
    .setHTML(value)
    .addTo(this.map);
  }

  public getAddress(place: any) {
    this.address = place.formatted_address;
    this.formattedAddress = place.formatted_address;

    this.placePopup(place.geometry.location.lat(), place.geometry.location.lng(), this.formattedAddress);
    // this.zone.run(() => this.formattedAddress = place.formatted_address);
  }
}
