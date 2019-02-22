import { Injectable } from '@angular/core';
import {MusicService} from '../../../../services/music.service';
import {Album} from '../../../../../../classes/music/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuWebsiteService {
  private   menuWebsite = {
    label: 'Naar website',
    action: this.website.bind(this),
    icon: 'web',
    color: '',
  };
  private albumId;

  constructor(
    private musicService: MusicService,
  ) { }

  private website() {
    this.musicService.openwebsite(this.albumId)
      .subscribe();
  }

  menu(album: Album) {
    this.albumId = album.ID;
    return this.menuWebsite;
  }
}
