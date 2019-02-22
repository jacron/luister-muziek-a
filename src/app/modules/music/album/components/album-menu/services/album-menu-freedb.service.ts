import { Injectable } from '@angular/core';
import {Album} from '../../../../../../classes/music/Album';
import {environment} from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuFreedbService {
  private   menuFreeDb = {
    label: 'freeDB',
    action: this.openfreedb.bind(this),
    icon: 'library_music',
    color: '#395499'
  };
  private discid;

  constructor() { }

  private openfreedb() {
    window.open(environment.freedbUrl + this.discid);
  }

  menu(album: Album) {
    this.discid = album.discid;
    return this.menuFreeDb;
  }
}
