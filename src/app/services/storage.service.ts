import { Injectable } from '@angular/core';
import {Album} from '../classes/Album';
import {Choice} from '../classes/Choice';
import {List} from '../classes/List';

@Injectable()
export class StorageService {

  keyAlbums = 'lmuzalbums';
  keySearchTitle = 'lmuztitle';
  keySearchParms = 'lmuzparms';
  keyChoiceVisiblities = 'lmuzchoice';
  keyList = 'lmuzlist';
  storage = localStorage;

  constructor(
  ) { }

  storeAlbumIds(albums: Album[]) {
    this.storage.setItem(this.keyAlbums, JSON.stringify(albums));
  }

  storeListTitle(searchTitle: string) {
    this.storage.setItem(this.keySearchTitle, JSON.stringify(searchTitle));
  }

  storeList(list: List) {
    this.storage.setItem(this.keyList, JSON.stringify(list));
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

  retrieveList() {
    const list = this.storage.getItem(this.keyList);
    return JSON.parse(list);
  }

  retrieveAlbumIds() {
    const albums = this.storage.getItem(this.keyAlbums);
    return JSON.parse(albums);
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
