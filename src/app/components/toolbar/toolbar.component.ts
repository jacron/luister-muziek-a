import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Album} from '../../classes/Album';
import {MusicService} from '../../services/music.service';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage.service';
import {MatDialog, MatMenuTrigger} from '@angular/material';
import {DialogPiecesComponent} from '../../dialogs/dialog-pieces/dialog-pieces.component';
import {List} from '../../classes/List';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input() album: Album;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  // searchTitle: string;
  // searchParams: any;
  list: List;
  // albumIds: number[];
  navForwards: boolean;
  navBackwards: boolean;
  navForwardsCount: number;
  navBackwardsCount: number;
  musicAlbumUrl = 'http://localhost:8010/album/';

  constructor(
    private musicService: MusicService,
    private router: Router,
    private storageService: StorageService,
    private dialog: MatDialog,
  ) { }

  ngOnChanges(changes) {
    this.enableNavig();
  }

  albumTitleKeydown(e, id, title) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateAlbumTitle(id, title);
    }
    if (e.key === 'Tab') {
      this.updateAlbumTitle(id, title);
    }
  }

  albumDescriptionKeydown(e, id, title) {
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
      () => {},
      error => console.error(error)
    );
  }

  editPieces() {
    this.dialog.open(DialogPiecesComponent, {
      // width: '99%',
      data: {
        pieces: this.album.pieces,
        albumId: this.album.ID,
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

  pasteAlbumImage() {
    this.musicService.pasteAlbumImage(this.album.ID).subscribe();
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

  toList() {
    this.router.navigate([
      this.list.url,
      this.list.params
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
    const albumIds = this.list.albumIds;
    for (let i = 1; i < albumIds.length; i++) {
      if (albumIds[i] === +this.album.ID) {
        this.router.navigate(['/album',
          albumIds[i - 1]]).then();
      }
    }
  }

  forward() {
    const albumIds = this.list.albumIds;
    for (let i = 0; i < albumIds.length - 1; i++) {
      if (albumIds[i] === +this.album.ID) {
        this.router.navigate(['/album',
          albumIds[i + 1]]).then();
      }
    }
  }

  enableNavig() {
    if (!this.list) {
      this.navBackwards = this.navForwards = false;
      return;
    }
    const albumIds = this.list.albumIds;
    if (!albumIds || !Array.isArray(albumIds) || albumIds.length === 0) {
      this.navBackwards = this.navForwards = false;
      return;
    }
    this.navBackwards = this.navForwards = true;

    for (let i = 0; i < albumIds.length; i++) {
      if (albumIds[i] === +this.album.ID) {
        if (i === 0) {
          this.navBackwards = false;
        }
        this.navBackwardsCount = i;
        this.navForwardsCount = albumIds.length - i - 1;
        if (i === albumIds.length - 1) {
          this.navForwards = false;
        }
        break;
      }
    }
  }

  ngOnInit() {
    // this.albumIds = this.storageService.retrieveAlbumIds();
    // console.log(this.albumIds);
    this.list = this.storageService.retrieveList();
    console.log(this.list);
    this.enableNavig();
    // this.searchTitle = this.storageService.retrieveSearchTitle();
    // this.searchParams = this.storageService.retrieveSearchParameters();
  }

}
