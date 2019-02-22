import { Injectable } from '@angular/core';
import {MusicService} from '../../../../services/music.service';
import {Album} from '../../../../../../classes/music/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuTageditorService {
  private option =     {
    label: 'Tag-editor',
    action: this.tagedit.bind(this),
    icon: 'edit',
    color: 'brown',
  };
  private albumId;

  constructor(
    private musicService: MusicService,
  ) { }

  private tagedit() {
    this.musicService.tagEditor(this.albumId).subscribe();
  }

  menu(album: Album) {
    this.albumId = album.ID;
    return this.option;
  }

}
