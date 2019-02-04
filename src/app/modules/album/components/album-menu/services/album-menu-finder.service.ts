import { Injectable } from '@angular/core';
import {MusicService} from '../../../../../services/music.service';
import {Album} from '../../../../../classes/music/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuFinderService {
  private option =     {
    label: 'Toon in Finder',
    action: this.openFinder.bind(this),
    icon: 'search',
    color: '#44bbee',
  };
  private albumId;

  constructor(
    private musicService: MusicService,
  ) { }

  private openFinder() {
    this.musicService.openFinder(this.albumId).subscribe(
      () => {},
      error => console.error(error)
    );
  }

  menu(album: Album) {
    this.albumId = album.ID;
    return this.option;
  }

}
