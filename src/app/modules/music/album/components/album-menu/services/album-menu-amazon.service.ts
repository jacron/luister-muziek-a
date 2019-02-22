import { Injectable } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {Album} from '../../../../../../classes/music/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuAmazonService {
  private amazonUrl = environment.amazonUrl;
  private asin: string;
  private menuAmazon = {
    label: 'Amazon',
    action: this.openamazon.bind(this),
    icon: 'music_video',
    color: 'orange'
  };

  constructor() { }

  menu(album: Album) {
    this.asin = album.asin || album.ASIN;
    return this.menuAmazon;
  }

  private openamazon() {
    window.open(this.amazonUrl + this.asin);
  }

}
