import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Album} from '../../classes/Album';
import {MusicService} from '../../services/music.service';
import {Router} from '@angular/router';
import {StorageService} from '../../storage.service';
import {MatDialog, MatMenuTrigger} from '@angular/material';
import {DialogAddComponent} from '../../dialogs/dialog-add/dialog-add.component';
import {DialogPiecesComponent} from '../../dialogs/dialog-pieces/dialog-pieces.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input('album') album: Album;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  searchTitle: string;
  searchParams: any;
  albums: Album[];
  navForwards: boolean;
  navBackwards: boolean;
  musicAlbumUrl = 'http://localhost:8010/album/';

  constructor(    private musicService: MusicService,
                  private router: Router,
                  private storageService: StorageService,
                  private dialog: MatDialog,
  ) { }

  ngOnChanges(changes) {
    this.enableNavig();
  }

  openMenu() {
    // this.trigger.openMenu();
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

  albumDescriptionKeydown(e, id, title) {
    console.log(id, title);
    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateAlbumDescription(id, title);
    }
    if (e.key === 'Tab') {
      this.updateAlbumDescription(id, title);
    }
  }

  openFinder(id) {
    this.musicService.openFinder(id).subscribe(
      (response) => console.log(response)
    );
  }

  editPieces() {
    const dialogRef = this.dialog.open(DialogPiecesComponent, {
      width: '99%',
      data: {
        pieces: this.album.pieces,
        albumId: this.album.ID,
        album: this.album
      }
    });
  }

  addSome() {
    this.dialog.open(DialogAddComponent, {
      width: '80%',
      data: {
        album: this.album
      }
    });
  }

  openMusic(id) {
    window.open(this.musicAlbumUrl + id, 'music');
  }

  restorePieces(album: Album) {
    this.album.pieces = album.pieces;
    this.album.cuesheets = album.cuesheets;
  }

  tagedit() {
    this.musicService.tagEditor(this.album.Path).subscribe();
  }

  refetch(albumId) {
    this.musicService.refetch(albumId).subscribe(
      (response: Album) => this.restorePieces(response)
    );
  }

  website() {
    this.musicService.openwebsite(this.album.ID)
      .subscribe();
  }

  updateAlbumTitle(id, title) {
    this.musicService.updateAlbumTitle(id, title).subscribe(
      (msg) => console.log(msg)
    );
  }

  updateAlbumDescription(id, title) {
    this.musicService.updateAlbumDescription(id, title).subscribe(
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

  toCollection() {
    this.router.navigate(['/search',
      {
        idcoll: this.album.mother.ID,
        idcomp: -1,
        idperf: -1,
        idtag: -1
      }
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
    for (let i = 0; i < this.albums.length; i++) {
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
    // console.log(this.album);
    this.albums = this.storageService.retrieveAlbums();
    this.enableNavig();
    this.searchTitle = this.storageService.retrieveSearchTitle();
    this.searchParams = this.storageService.retrieveSearchParameters();
  }

}