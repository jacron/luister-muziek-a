import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MusicService} from './music.service';

class Album {
  Title: string;
  // AlbumID: string;
  ID: string;
  // Path: string;
}

class Albums {
  constructor() {
    this.mothers = [];
    this.children = [];
  }

  mothers: Album[];
  children: Album[];
}

class Composer {
  Name: string;
  ID: string;
}

const albumUrl = 'http://127.0.0.1:8010/album/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Luister Muziek A';
  albumHref: string;
  albumTitle: string;
  path: string;
  albums: Albums = new Albums();
  composer: Composer;
  composers: Composer[];
  selectedComposerId: string;
  testTitle = 'test regeltje als titel';

  constructor(private http: HttpClient,
              private musicService: MusicService) {
  }

  selectPath(e) {
    e.target.select();
  }

  presentAlbum(album: Album) {
    this.albumTitle = album.Title;
    this.albumHref = albumUrl + album.ID;
  }

  presentAlbums(albums: Albums) {
    console.log(albums);
    this.albums = albums;
  }

  getAlbum() {
    this.musicService.getAlbumByPath(this.path).subscribe(
      (album: Album) => this.presentAlbum(album),
      err => console.error(err),
      () => console.log('album get finished')
    );
  }

  getAlbumsComponist(componistId) {
    this.musicService.getAlbumsComponist(componistId).subscribe(
      (albums: Albums) => this.presentAlbums(albums),
      err => console.error(err),
      () => console.log('componist albums fetched')
    );
  }

  getComposers() {
    this.musicService.getComposers().subscribe(
      (composers: Composer[]) => {this.composers = composers; console.log(composers); },
      err => console.error(err),
      () => console.log('componisten fetched')
    );
  }

  albumPath(e) {
    if (e.key === 'Enter') {
      this.getAlbum();
    }
  }

  updateAlbumTitle(id, title) {
    this.musicService.updateAlbumTitle(id, title).subscribe(
      (msg) => console.log(msg)
    );
  }

  albumTitleKeydown(e, id, title) {
    console.log(id, title);
    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateAlbumTitle(id, title);
    }
    if (e.key === 'Tab') {
      this.updateAlbumTitle(id, title);
    }
  }

  ngOnInit() {
    this.path = '/Volumes/Media/Audio/Klassiek/Componisten/Bach/Mattheus Passion/Frans Bruggen';
    this.selectedComposerId = '1'; // D. Scarlatti
    this.getComposers();
  }
}
