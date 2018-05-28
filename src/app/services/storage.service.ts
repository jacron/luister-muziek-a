import { Injectable } from '@angular/core';
import {Album} from '../classes/Album';

@Injectable()
export class StorageService {

  keyAlbums = 'lmuzalbums';
  keySearchTitle = 'lmuztitle';
  keySearchParms = 'lmuzparms';
  storage = sessionStorage;

  constructor() { }

  storeAlbums(albums: Album[]) {
    this.storage.setItem(this.keyAlbums, JSON.stringify(albums));
  }

  storeSearchTitle(searchTitle: string) {
    this.storage.setItem(this.keySearchTitle, JSON.stringify(searchTitle));
  }

  storeSearchParameters(parms) {
    this.storage.setItem(this.keySearchParms, JSON.stringify(parms));
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
