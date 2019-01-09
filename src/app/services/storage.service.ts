import { Injectable } from '@angular/core';
import {Album} from '../classes/music/Album';
import {Choice} from '../classes/music/Choice';
import {List} from '../classes/music/List';
import {StoreService} from './store.service';

@Injectable()
export class StorageService {

  keyAlbums = 'lmuzalbums';
  keySearchTitle = 'lmuztitle';
  keySearchParms = 'lmuzparms';
  keyChoiceVisiblities = 'lmuzchoice';
  keyList = 'lmuzlist';
  // storage = localStorage;

  constructor(
    private storage: StoreService,
  ) {
  }

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
    if (!list) {
      return null;
    }
    return JSON.parse(list);
  }

  retrieveAlbumIds() {
    const albums = this.storage.getItem(this.keyAlbums);
    if (!albums) {
      return null;
    }
    return JSON.parse(albums);
  }

  retrieveSearchTitle() {
    const searchTitle = this.storage.getItem(this.keySearchTitle);
    if (!searchTitle) {
      return null;
    }
    return JSON.parse(searchTitle);
  }

  retrieveSearchParameters() {
    const searchParams = this.storage.getItem(this.keySearchParms);
    if (!searchParams) {
      return null;
    }
    return JSON.parse(searchParams);
  }

  retrieveChoiceVisiblities(choices: Choice[]): void {
    const visibilities = this.storage.getItem(this.keyChoiceVisiblities);
    if (!visibilities) {
      return;
    }
    const pvisibilities = JSON.parse(visibilities);
    choices.forEach(choice => {
      choice.visible = pvisibilities.shift();
    });
  }
}
