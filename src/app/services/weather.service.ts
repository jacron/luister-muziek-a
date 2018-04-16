import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

// Nieuwland (Home)
const lat = 52.205880,
  lng = 5.366183;

@Injectable()
export class WeatherService {

  requestUrl = environment.apiWeather;
  requestApiKey = environment.apiWeatherKey;
  //  apiWeather: 'api.openweathermap.org/data/2.5/weather?q=Amersfoort&lang=nl',
  // https://www.latlong.net/
  constructor(private http: HttpClient) { }

  /* GET */
  getData() {
    // const params = new HttpParams()
    //   .set('cmd', 'infos');
    return this.http.get(this.getUrl(), {
      responseType: 'json'
    });
  }

  getUrl() {
    return this.requestUrl + 'lat=' + lat + '&lon=' + lng +
      '&lang=nl' + '&units=metric' +
      '&APPID=' + this.requestApiKey;
  }

}
