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
  imgUrl = environment.apiServer + '/image/br/';
  liveweerData;
  windBft = environment.weather.windMap;
  tempMap = environment.weather.tempMap;
  buienradarApi = environment.weather.buienradarApi + 'w=500&h=512';
  brProxyUrl = environment.apiServer + '/image/br/';
  brMode = 'still';

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService,
  ) { }

  afterGetData(response) {
    console.log(response.liveweer[0]);
    this.liveweerData = response.liveweer[0];
    this.liveweerData.stored = this.storageService.prettyDateTime();
    this.storageService.storeLiveWeer(response.liveweer[0]);
  }

  getWeather() {
    this.weatherService.getData().subscribe(
      response => this.afterGetData(response)
    );
  }

  openBr() {
    this.brMode = 'dynamic';
  }

  ngOnInit() {
    this.liveweerData = this.storageService.retrieveLiveWeer();
  }

}
