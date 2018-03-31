import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {MusicService} from '../music.service';
import {Router} from '@angular/router';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input('album') album: Album;
  searchTitle: string;
  searchParams: any;
  albums: Album[];
  navForwards: boolean;
  navBackwards: boolean;

  constructor(    private musicService: MusicService,
                  private router: Router,
                  private storageService: StorageService
  ) { }

  ngOnChanges(changes) {
    console.log(changes);
    this.enableNavig();
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

  openFinder(id) {
    this.musicService.openFinder(id).subscribe(
      (response) => console.log(response)
    );
  }

  restorePieces(album: Album) {
    console.log(album);
    this.album.pieces = album.pieces;
    this.album.cuesheets = album.cuesheets;
  }

  tagedit() {
    this.musicService.tagEditor(this.album.Path).subscribe();
  }

  pause() {
    this.musicService.controlPlayer('pause').subscribe();
  }

  refetch(albumId) {
    this.musicService.refetch(albumId).subscribe(
      (response: Album) => this.restorePieces(response)
    );
  }

  updateAlbumTitle(id, title) {
    this.musicService.updateAlbumTitle(id, title).subscribe(
      (msg) => console.log(msg)
    );
  }

  toSearch() {
    console.log(this.searchParams);
    this.router.navigate(['/search',
      this.searchParams
    ]).then(() => {
    });
  }

  back() {
    for (let i = 1; i < this.albums.length; i++) {
      if (this.albums[i].ID === +this.album.ID) {
        this.router.navigate(['/album',
          this.albums[i - 1].ID]).then();
      }
    }
  }

  forward() {
    for (let i = 0; i < this.albums.length - 1; i++) {
      if (this.albums[i].ID === +this.album.ID) {
        this.router.navigate(['/album',
          this.albums[i + 1].ID]).then();
      }
    }
  }

  enableNavig() {
    if (!this.albums || this.albums.length === 0) {
      console.log('empty album list');
      return;
    }
    this.navBackwards = this.navForwards = true;
    console.log(+this.album.ID);
    for (let i = 0; i < this.albums.length; i++) {
      console.log(i, this.albums[i].ID);
      if (this.albums[i].ID === +this.album.ID) {
        if (i === 0) {
          this.navBackwards = false;
        }
        if (i === this.albums.length - 1) {
          this.navForwards = false;
        }
      }
    }
  }

  ngOnInit() {
    this.albums = this.storageService.retrieveAlbums();
    this.enableNavig();
    this.searchTitle = this.storageService.retrieveSearchTitle();
    this.searchParams = this.storageService.retrieveSearchParameters();
  }

}
