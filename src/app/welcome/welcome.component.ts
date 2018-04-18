import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {StorageService} from '../services/storage.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  w_data;
  w_error;
  liveweerData;
  windBft = environment.windMap;
  tempMap = environment.tempMap;
  buienradarUrl = environment.buienradar;
  // windInfo = '90: Oost&#13; 180: Zuid';
  // http://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/windkracht.png
  // http://www.knmi.nl/actueel/images/windbftgmt.png

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) { }

  afterGetData(response) {
    console.log(response.liveweer[0]);
    this.liveweerData = response.liveweer[0];
    this.liveweerData.stored = this.storageService.prettyDateTime();
    this.storageService.storeLiveWeer(response.liveweer[0]);
    // if (response.cod === 200) {
    //   this.w_data = response;
    //   this.w_data.stored = this.storageService.prettyDateTime();
    //   this.storageService.storeWeather(this.w_data);
    // } else {
    //   this.w_error = response.cod;
    // }
  }

  getWeather() {
    this.weatherService.getData().subscribe(
      response => this.afterGetData(response)
    );
  }

  getTime(t) {
    const d = new Date(t * 1000),
      minutes = '0' + d.getMinutes();
    return d.getHours() + ':' + minutes.substr(-2);
  }

  getSpeed(m) {
    return m;
  }

  getDirection(deg) {
    const trans = {
      360: 'N',
      45: 'NO',
      90: 'O',
      135: 'ZO',
      180: 'Z',
      225: 'ZW',
      270: 'W',
      315: 'NW'
    };
    return trans[deg];
  }

  getTemp(temp) {
    return temp;
  }

  ngOnInit() {
    this.w_data = this.storageService.retrieveWeather();
    this.liveweerData = this.storageService.retrieveLiveWeer();
  }

}
