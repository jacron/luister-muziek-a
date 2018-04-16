import { Component, OnInit } from '@angular/core';
import {MusicService} from '../services/music.service';
import {WeatherService} from '../services/weather.service';
import {StorageService} from '../services/storage.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  infos;
  w_data;
  w_error;
  objectKeys = Object.keys;
  windkaartUrl = environment.windkaartUrl;

  constructor(
    private musicService: MusicService,
    private weatherService: WeatherService,
    private storageService: StorageService
  ) { }

  afterGetData(response) {
    console.log(response);
    if (response.cod === 200) {
      this.w_data = response;
      this.w_data.stored = this.storageService.prettyDateTime();
      this.storageService.storeWeather(this.w_data);
    } else {
      this.w_error = response.cod;
    }
  }

  getWeather() {
    this.weatherService.getData().subscribe(
      response => this.afterGetData(response)
    );
  }

  isObject(s) {
    return typeof s === 'object';
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

  afterGetInfos(response) {
    this.infos = response;
  }

  ngOnInit() {
    this.musicService.getInfos().subscribe(
      response => this.afterGetInfos(response)
    );
    this.w_data = this.storageService.retrieveWeather();
    // console.log(this.w_data);
  }

}
