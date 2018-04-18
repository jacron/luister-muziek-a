import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

// Nieuwland (Home)
// const lat = 52.205880,
//   lng = 5.366183;
// afgerond door apiserver tot 52.21, 5.37, wat iets noordelijker en
// oostelijker is, maar het scheelt weinig, zie
// https://www.latlong.net/Show-Latitude-Longitude.html

@Injectable()
export class WeatherService {

  openweathermap = {
    requestUrl: environment.apiWeather,
    requestApiKey: environment.apiWeatherKey
  };
  weerlive = {
    requestUrl: environment.weerliveApi,
  };
  latlng = {
    lat: 52.205880,
    lng: 5.366183
  };


  constructor(private http: HttpClient) {
  }

  /* GET */
  getData() {
    return this.http.get(this.getUrl(), {
      responseType: 'json'
    });
  }

  getUrl() {
    //   return this.requestUrl + 'lat=' + lat + '&lon=' + lng +
    //     '&lang=nl' + '&units=metric' +
    //     '&APPID=' + this.requestApiKey;
    // }
    return this.weerlive.requestUrl + this.latlng.lat + ',' + this.latlng.lng;
  }
}
