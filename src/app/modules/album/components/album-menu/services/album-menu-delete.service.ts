import { Injectable } from '@angular/core';
import {Album} from '../../../../../classes/music/Album';
import {MusicService} from '../../../../../services/music.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuDeleteService {
  private option =     {
    label: 'Verwijder',
    action: this.delete.bind(this),
    icon: 'close',
    color: 'red',
  };
  private title;
  private albumId;

  constructor(
    private musicService: MusicService,
  ) { }

  private afterDelete() {
    alert(this.title + ' is verwijderd');
  }

  private delete() {
    if (confirm(this.title + ' verwijderen?')) {
      this.musicService.removeAlbum(this.albumId).subscribe(
        () => this.afterDelete());
    }
  }

  menu(album: Album) {
    this.title = album.Title;
    this.albumId = album.ID;
    return this.option;
  }
}
