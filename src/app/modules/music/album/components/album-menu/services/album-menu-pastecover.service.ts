import { Injectable } from '@angular/core';
import {MusicService} from '../../../../services/music.service';
import {Album} from '../../../../../../classes/music/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuPastecoverService {
  private option =     {
    label: 'Plak cover in',
    action: this.pasteAlbumImage.bind(this),
    icon: 'image',
    color: '#4477cc',
  };
  private album: Album;

  constructor(
    private musicService: MusicService,
  ) { }

  private afterPasteImage(result) {
    // console.log(result);
    if (result.status == 200) {
      // this.updateimage.emit(result.imagePath);
      // this.album.
    }
  }

  private pasteAlbumImage() {
    this.musicService.pasteAlbumImage(this.album.ID).subscribe(
      result => this.afterPasteImage(result)
    );
  }

  menu(album: Album) {
    this.album = album;
    return this.option;
  }
}
