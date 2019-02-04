import { Injectable } from '@angular/core';
import {Album} from '../../../../../classes/music/Album';
import {MusicService} from '../../../../../services/music.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuRefetchService {
  private option =     {
    label: 'Herlaad muziekstukken',
    action: this.refetch.bind(this),
    icon: 'replay',
    color: '#ff7733',
  };
  private album: Album;

  constructor(
    private musicService: MusicService,
  ) { }

  private restorePieces(album: Album) {
    this.album.pieces = album.pieces;
    this.album.cuesheets = album.cuesheets;
  }

  private refetch() {
    if (window.confirm('Stukken herladen? Aliassen gaan verloren!')) {
      this.musicService.refetch(this.album.ID).subscribe(
        (response: Album) => this.restorePieces(response)
      );
    }
  }

  menu(album: Album) {
    this.album = album;
    return this.option;
  }
}
