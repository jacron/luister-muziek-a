import { Injectable } from '@angular/core';
import {Album} from '../classes/Album';
import {Choice} from '../classes/Choice';

@Injectable()
export class StorageService {

  keyAlbums = 'lmuzalbums';
  keySearchTitle = 'lmuztitle';
  keySearchParms = 'lmuzparms';
  keyChoiceVisiblities = 'lmuzchoice';
  storage = localStorage;

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

  storeChoiceVisibilities(choices: Choice[]) {
    if (!choices) {
      return;
    }
    const visibilities: boolean[] = [];
    choices.forEach(choice => {
      visibilities.push(choice.visible);
    });
    this.storage.setItem(this.keyChoiceVisiblities, JSON.stringify(visibilities));
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

  retrieveChoiceVisiblities(choices: Choice[]) {
    const visibilities = JSON.parse(this.storage.getItem(this.keyChoiceVisiblities));
    if (!visibilities) {
      return;
    }
    choices.forEach(choice => {
      choice.visible = visibilities.shift();
    });
  }
}
