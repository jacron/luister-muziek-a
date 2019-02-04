import { Injectable } from '@angular/core';
import {Album} from '../../../../../classes/music/Album';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuGoogleService {
  private option =     {
    label: 'Google',
    action: this.searchGoogle.bind(this),
    icon: 'search',
    color: '#66bbee',
  };
  private title;

  constructor() { }

  private searchGoogle() {
    window.open(environment.googleUrl + this.title);
  }

  menu(album: Album) {
    this.title = album.Title;
    return this.option;
  }
}
