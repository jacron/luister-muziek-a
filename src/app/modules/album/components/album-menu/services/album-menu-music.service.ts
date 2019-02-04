import { Injectable } from '@angular/core';
import {Album} from '../../../../../classes/music/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuMusicService {
  private option = {
    label: 'Open in \'music\'',
    action: this.openMusic.bind(this),
    icon: 'queue_music',
    color: '',
  };
  private musicAlbumUrl = 'http://localhost:8010/album/';
  private albumId;

  constructor() { }

  private openMusic() {
    window.open(this.musicAlbumUrl + this.albumId, 'music');
  }

  menu(album: Album) {
    this.albumId = album.ID;
    return this.option;
  }
}
