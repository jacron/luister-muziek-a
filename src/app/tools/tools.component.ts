import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import {Album} from '../classes/Album';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  path: string;
  album: Album;
  albumHref: string;
  albumTitle: string;
  albumUrl = 'http://127.0.0.1:8010/album/';

  constructor(
    private musicService: MusicService,
    private router: Router,
  ) {}

  selectPath(e) {
    e.target.select();
  }

  presentAlbum(album: Album) {
    this.album = album;
    // this.albumTitle = album.Title;
    // this.albumHref = this.albumUrl + album.ID;
  }

  getAlbum() {
    this.musicService.getAlbumByPath(this.path).subscribe(
      (album: Album) => this.presentAlbum(album),
      err => console.error(err),
      () => console.log('album get finished')
    );
  }

  uploadAlbum() {
    this.musicService.uploadAlbumByPath(this.path).subscribe(
      (album: Album) => this.presentAlbum(album),
      err => console.error(err),
      () => console.log('album get finished')
    );
  }

  albumPathGet(e) {
    if (e.key === 'Enter') {
      this.getAlbum();
    }
  }

  albumPathUpload(e) {
    if (e.key === 'Enter') {
      this.uploadAlbum();
    }
  }

  toAlbum() {
    this.router.navigate(['/album', this.album.ID]).then(() => {
      // this.storageService.storeSearchTitle(document.title);
      // this.storageService.storeSearchParameters(this.params);
    });
  }

  ngOnInit() {
    // test path
    this.path = '/Volumes/Media/Audio/Klassiek/Componisten/Bach/Mattheus Passion/Frans Bruggen';
  }

}
