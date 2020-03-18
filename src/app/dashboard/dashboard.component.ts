import {Component, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  address: any;
  establishmentAddress: any;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  phone: string;

  constructor(public zone: NgZone) { }

  // getAddress(place: any) {
  //   this.address = place.formatted_address;
  //   this.phone = this.getPhone(place);
  //   this.formattedAddress = place.formatted_address;
  //   this.zone.run(() => this.formattedAddress = place.formatted_address);
  // }
  //
  // getEstablishmentAddress(place: any) {
  //   this.establishmentAddress = place.formatted_address;
  //   this.phone = this.getPhone(place);
  //   this.formattedEstablishmentAddress = place.formatted_address;
  //   this.zone.run(() => {
  //     this.formattedEstablishmentAddress = place.formatted_address;
  //     this.phone = place.formatted_phone_number;
  //   });
  // }

  // getAddrComponent(place, componentTemplate) {
  //   let result;
  //   place.address_components.forEach((addressComp) => {
  //     const addressType = addressComp.types[0];
  //     if (componentTemplate[addressType]) {
  //       result = addressComp[componentTemplate[addressType]];
  //       return result;
  //     }
  //   });
  //
  //   // for (let i = 0; i < place.address_components.length; i++) {
  //   //   const addressType = place.address_components[i].types[0];
  //   //   if (componentTemplate[addressType]) {
  //   //     result = place.address_components[i][componentTemplate[addressType]];
  //   //     return result;
  //   //   }
  //   // }
  //   return;
  // }
  //
  // getStreetNumber(place) {
  //   const COMPONENT_TEMPLATE = { street_number: 'short_name' };
  //   const  streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  //   return streetNumber;
  // }
  //
  // getStreet(place) {
  //   const COMPONENT_TEMPLATE = { route: 'long_name' };
  //   const  street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  //   return street;
  // }
  //
  // getCity(place) {
  //   const COMPONENT_TEMPLATE = { locality: 'long_name' };
  //   const  city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  //   return city;
  // }
  //
  // getState(place) {
  //   const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' };
  //   const  state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  //   return state;
  // }
  //
  // getDistrict(place) {
  //   const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' };
  //   const  state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  //   return state;
  // }
  //
  // getCountryShort(place) {
  //   const COMPONENT_TEMPLATE = { country: 'short_name' };
  //   const  countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  //   return countryShort;
  // }
  //
  // getCountry(place) {
  //   const COMPONENT_TEMPLATE = { country: 'long_name' };
  //   const  country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  //   return country;
  // }
  //
  // getPostCode(place) {
  //   const COMPONENT_TEMPLATE = { postal_code: 'long_name' };
  //   const  postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  //   return postCode;
  // }
  //
  // getPhone(place) {
  //   const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' };
  //   const phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  //   return phone;
  // }

}
