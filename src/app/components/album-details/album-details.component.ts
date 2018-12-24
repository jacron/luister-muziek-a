import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Album} from '../../classes/Album';
import {environment} from '../../../environments/environment';
import {MusicService} from '../../services/music.service';
import {MatDialog} from '@angular/material';
import {DialogPicComponent} from '../../dialogs/dialog-pic/dialog-pic.component';
import {ActivatedRoute, Router} from '@angular/router';
import {List} from '../../classes/List';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, DoCheck {
  @Input() album: Album;

  imgUrl = environment.apiServer + '/image/';
  imgBackUrl = environment.apiServer + '/image/back/';
  navBackwards: boolean;
  navForwards: boolean;
  navBackwardsCount: number;
  navForwardsCount: number;
  list: List;
  chevron = 'keyboard_arrow_down';
  idpiece: number;

  constructor(
    private musicService: MusicService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private storageService: StorageService,
  ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params['idalbum']) {
      this.musicService.getAlbumById(params['idalbum']).subscribe(
        (album: Album) => this.openAlbum(album),
        err => console.error(err),
        () => {}
      );
    }
    if (params['idpiece']) {
      this.idpiece = +params['idpiece'];
    }
  }

  albumPiecesContainSelection(idpiece: number) {
    if (!this.album) {
      return false;
    }
    const albumPieces = this.album.pieces;
    for (let i = 0; i < albumPieces.length; i++) {
      if (+albumPieces[i].ID === idpiece) {
        return true;
      }
    }
    return false;
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

  openAlbum(album: Album): void {
    this.album = album;
    this.chevron = 'keyboard_arrow_down';
    if (album) {
      // console.log(album);
      document.title = album.Title;
      if (album.cuesheets.length < 1) {
        this.album.expanded = true;
      }
      // console.log(this.idpiece);
      if (this.albumPiecesContainSelection(this.idpiece)) {
        this.album.expanded = true;
      }
    }
  }

  openPic(mode): void {
    const imgUrl = this.imgUrl + this.album.ID + '/album';
    const backUrl = this.album.album_back_image ? this.imgBackUrl + this.album.ID + '/album' : null;
    this.dialog.open(DialogPicComponent, {
      data: {
        imgUrl: imgUrl,
        backUrl: backUrl,
        mode: mode
      }
    });
  }

  openPieces() {
    this.album.expanded = !this.album.expanded;
    this.chevron = this.album.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  enableNavig(list: List) {
    if (!list || !this.album) {
      this.navBackwards = this.navForwards = false;
      return;
    }
    const albumIds = list.albumIds;
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

  ngDoCheck() {
    this.enableNavig(this.list);

  }

  ngOnInit() {
    this.list = this.storageService.retrieveList();
  }
}

