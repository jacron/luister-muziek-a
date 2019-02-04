import { Injectable } from '@angular/core';
import {Album} from '../../../../../classes/music/Album';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuBrainzService {
  private   menuBrainz = {
    label: 'MusicBrainz',
    action: this.openmusicbrainz.bind(this),
    icon: 'library_music',
    color: '#8f407a'
  };
  private discid;
  private musicbrainzUrl = environment.musicbrainz;

  constructor() { }

  private openmusicbrainz() {
    window.open(this.musicbrainzUrl + this.discid);
  }

  menu2(album: Album) {
    this.discid = album.discid;
    return this.menuBrainz;
  }
}
