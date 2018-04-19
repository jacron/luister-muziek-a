import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

// https://www.latlong.net/Show-Latitude-Longitude.html

@Injectable()
export class WeatherService {

  weerlive = {
    requestUrl: environment.weather.weerliveApi,
  };
  latlng = {
    lat: 52.205880,
    lng: 5.366183
  };


  constructor(
    private http: HttpClient) {
  }

  getData() {
    return this.http.get(this.getUrl(), {
      responseType: 'json'
    });
  }

  getUrl() {
    return this.weerlive.requestUrl + this.latlng.lat + ',' + this.latlng.lng;
  }
}
