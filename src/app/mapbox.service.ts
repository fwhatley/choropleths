import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  public constructor(private  httpClient: HttpClient) {}

  // https://stackoverflow.com/questions/46991237/how-to-import-json-file-into-a-typescript-file
  // how to read json from local
  public getCountyCrime(): Observable<any> {
    return this.httpClient.get('/assets/countyCrime.json');
  }

  public getGeoJsonDataFromFile(filepath: string): Observable<any> {
    return this.httpClient.get(filepath);
  }

  public getGeojsonInitObject(): any {
    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    };
  }

  // coloring stuf below
  private getPriceColor(value: number): string {
    // use to generate colors: https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3
    return  value > 900 ? '#49006a' :
      value > 800  ? '#49006a' :
        value > 700  ? '#49006a' :
          value > 600  ? '#7a0177' :
            value > 500  ? '#ae017e' :
              value > 400  ? '#dd3497' :
                value > 300   ? '#fa9fb5' :
                  value > 200   ? '#fcc5c0' :
                    value > 100   ? '#fde0dd' :
                      '#fff7f3';
  }

  // public getPriceColor(value: number): string {
  //   // use to generate colors: https://www.color-hex.com/color-palette/2799
  //   return  value > 800 ? '#a67c00' :
  //     value > 600  ? '#bf9b30' :
  //       value > 400   ? '#ffbf00' :
  //         value > 200   ? '#ffcf40' :
  //           '#ffdc73';
  // }

  public getPricePaint(): any {
    return {
      'fill-outline-color': 'rgba(0,0,0,0.1)',
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'value'],
        0,
        this.getPriceColor(0),
        100,
        this.getPriceColor(100),
        200,
        this.getPriceColor(200),
        300,
        this.getPriceColor(300),
        400,
        this.getPriceColor(400),
        500,
        this.getPriceColor(500),
        600,
        this.getPriceColor(600),
        700,
        this.getPriceColor(700),
        800,
        this.getPriceColor(800)
      ],
      'fill-opacity': 0.75
    };
  }

  public getCrimeColor(value: number): string {
    // use to generate colors: https://www.color-hex.com/color-palette/2799
    return  value > 800 ? '#a63603' :
      value > 600  ? '#e6550d' :
        value > 400   ? '#fd8d3c' :
          value > 200   ? '#fdbe85' :
            '#feedde';
  }

  public getCrimePaint(): any {
    return {
      'fill-outline-color': 'rgba(0,0,0,0.1)',
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'value'],
        0,
        this.getCrimeColor(0),
        100,
        this.getCrimeColor(100),
        200,
        this.getCrimeColor(200),
        300,
        this.getCrimeColor(300),
        400,
        this.getCrimeColor(400),
        500,
        this.getCrimeColor(500),
        600,
        this.getCrimeColor(600),
        700,
        this.getCrimeColor(700),
        800,
        this.getCrimeColor(800)
      ],
      'fill-opacity': 0.75
    };
  }
}
