import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';
import {Album} from '../classes/Album';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  path: string;
  albumHref: string;
  albumTitle: string;
  albumUrl = 'http://127.0.0.1:8010/album/';

  constructor(private musicService: MusicService) {}

  selectPath(e) {
    e.target.select();
  }

  presentAlbum(album: Album) {
    this.albumTitle = album.Title;
    this.albumHref = this.albumUrl + album.ID;
  }

  getAlbum() {
    this.musicService.getAlbumByPath(this.path).subscribe(
      (album: Album) => this.presentAlbum(album),
      err => console.error(err),
      () => console.log('album get finished')
    );
  }

  albumPath(e) {
    if (e.key === 'Enter') {
      this.getAlbum();
    }
  }

  ngOnInit() {
    this.path = '/Volumes/Media/Audio/Klassiek/Componisten/Bach/Mattheus Passion/Frans Bruggen';
  }

}
