import { Injectable } from '@angular/core';
import {Album} from '../classes/Album';

@Injectable()
export class StorageService {

  keyAlbums = 'lmuzalbums';
  keySearchTitle = 'lmuztitle';
  keySearchParms = 'lmuzparms';
  keyWeather = 'openweather';
  keyLiveWeer = 'liveweer';
  storage = sessionStorage;

  constructor() { }

  prettyDateTime() {
    const d = new Date();
    return d.toLocaleString();
  }

  storeWeather(data) {
    this.storage.setItem(this.keyWeather, JSON.stringify(data));
  }

  storeLiveWeer(data) {
    this.storage.setItem(this.keyLiveWeer, JSON.stringify(data));
  }

  storeAlbums(albums: Album[]) {
    this.storage.setItem(this.keyAlbums, JSON.stringify(albums));
  }

  storeSearchTitle(searchTitle: string) {
    this.storage.setItem(this.keySearchTitle, JSON.stringify(searchTitle));
  }

  storeSearchParameters(parms) {
    this.storage.setItem(this.keySearchParms, JSON.stringify(parms));
  }

  retrieveWeather() {
    return JSON.parse(this.storage.getItem(this.keyWeather));
  }

  retrieveLiveWeer() {
    return JSON.parse(this.storage.getItem(this.keyLiveWeer));
  }

  retrieveAlbums() {
    return JSON.parse(this.storage.getItem(this.keyAlbums));
  }

  retrieveSearchTitle() {
    return JSON.parse(this.storage.getItem(this.keySearchTitle));
  }

  retrieveSearchParameters() {
    return JSON.parse(this.storage.getItem(this.keySearchParms));
  }

}
