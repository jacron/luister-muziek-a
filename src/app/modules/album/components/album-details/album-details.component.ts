import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Album} from '../../../../classes/music/Album';
import {environment} from '../../../../../environments/environment';
import {MusicService} from '../../../../services/music.service';
import {ActivatedRoute, Router} from '@angular/router';
import {List} from '../../../../classes/music/List';
import {StorageService} from '../../../../services/storage.service';
import {Cuesheet} from '../../../../classes/music/Cuesheet';
import {StateService} from '../../../../services/state.service';
import {AlbumService} from '../../services/album.service';
import {SettingsService} from '../../../../services/settings.service';
import {UtilService} from '../../../../services/util.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, DoCheck {
  @Input() album: Album;

  imgUrl = environment.apiServer + '/image/';
  imgBackUrl = environment.apiServer + '/image/back/';
  navBackwards = false;
  navForwards = false;
  navBackwardsCount= 0;
  navForwardsCount = 0;
  list: List;
  idpiece = -1;
  coverSize= -1;

  constructor(
    private musicService: MusicService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private stateService: StateService,
    private albumService: AlbumService,
    private settingsService: SettingsService,
    private utilServce: UtilService,
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

  afterEditAlbum(result) {
    if (result) {
      this.album.Title = result.title;
      this.album.Description = result.description;
    }
  }

  editAlbum() {
    this.albumService.rename(this.album).subscribe(
      result => this.afterEditAlbum(result)
    );
  }

  browse(e) {
    switch (e.key) {
      case 'ArrowRight':
        this.forward();
        e.preventDefault();
        break;
      case 'ArrowLeft':
        this.back();
        e.preventDefault();
        break;
    }
  }

  albumPiecesContainSelection(idpiece) {
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

  navigateIf(id, idTarg) {
    if (!id || !idTarg) {
      return;
    }
    if ((id === +id || id.indexOf('/') === -1)
      && id == this.album.ID) {
      this.router.navigate(['/album', idTarg]).then();
    } else {
      const parts = id.toString().split('/');
      const partsTarg = idTarg.toString().split('/');
      const idAlbum = parts[0];
      const idPiece = parts[1];
      if (idAlbum == this.album.ID && idPiece == this.idpiece) {
        this.router.navigate(['/album',
          partsTarg[0], partsTarg[1]]).then();
      }
    }
  }

  // swipeLeft() {
  //   this.back();
  // }
  //
  // swipeRight() {
  //   this.forward();
  // }

  back() {
    const albumIds = this.list.albumIds;
    for (let i = 1; i < albumIds.length; i++) {
      this.navigateIf(albumIds[i], albumIds[i - 1]);
    }
  }

  forward() {
    const albumIds = this.list.albumIds;
    for (let i = 0; i < albumIds.length - 1; i++) {
      this.navigateIf(albumIds[i], albumIds[i + 1]);
    }
  }

  getDiscid(album: Album) {
    for (let i = 0; i < album.cuesheets.length; i++) {
      const cuesheet: Cuesheet = album.cuesheets[i];
      if (cuesheet.discid) {
        album.discid = cuesheet.discid;
        return;
      }
    }
  }

  getAsin(album: Album) {
    for (let i = 0; i < album.cuesheets.length; i++) {
      const cuesheet: Cuesheet = album.cuesheets[i];
      if (cuesheet.asin) {
        album.asin = cuesheet.asin;
        return;
      }
    }
  }

  openAlbum(album: Album): void {
    this.album = album;
    if (album) {
      // console.log(album);
      this.stateService.setTitle(album.Title);
      document.title = album.Title;
      if (album.cuesheets.length < 1) {
        this.album.expanded = true;
      }
      // console.log(this.idpiece);
      if (this.albumPiecesContainSelection(this.idpiece)) {
        this.album.expanded = true;
      }
      this.getDiscid(album);
      this.getAsin(album);
      // this.getCuesheets(album);
    }
  }

  openPic(mode): void {
    const imgUrl = this.imgUrl + this.album.ID + '/album';
    const backUrl = this.album.album_back_image ? this.imgBackUrl + this.album.ID + '/album' : null;
    this.albumService.openPic({
      data: {
        imgUrl: imgUrl,
        backUrl: backUrl,
        mode: mode
      }
    }
  );
  }

  isNavigated(id) {
    if (id === +id || id.indexOf('/') === -1) {
      return id == this.album.ID;
    } else {
      const parts = id.split('/');
      const idAlbum = parts[0];
      const idPiece = parts[1];
      return idAlbum == this.album.ID && idPiece == this.idpiece;
    }
  }

  enableNavig(list: List) {
    if (!list || !this.album) {
      this.navBackwards = this.navForwards = false;
      return;
    }
    const albumIds = list.albumIds;
    if (!this.utilServce.isArray(albumIds) || albumIds.length === 0) {
      this.navBackwards = this.navForwards = false;
      return;
    }
    this.navBackwards = this.navForwards = true;

    for (let i = 0; i < albumIds.length; i++) {
      if (this.isNavigated(albumIds[i])) {
      // if (albumIds[i] == this.album.ID) {
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

  toList() {
    const params = this.list.params || [];
    this.router.navigate([
      this.list.url,
      params
    ]).then(() => {
    });
  }

  restorePieces(album: Album) {
    console.log(album);
    this.album = album;
    // this.album.pieces = album.pieces;
    // this.album.cuesheets = album.cuesheets;
  }

  reload(result) {
    console.log(result + ': in details');
    if (result == 'reload') {
      this.musicService.refetch(this.album.ID).subscribe(
        (response: Album) => this.restorePieces(response)
      );
    }
  }

  ngDoCheck() {
    this.enableNavig(this.list);

  }

  afterGetSizeFromSetting(size) {
    this.coverSize = size || 300;
  }

  ngOnInit() {
    this.list = this.storageService.retrieveList();
    this.coverSize = +this.settingsService.getCoverSize(300);
    this.settingsService.currentCoverSize.subscribe(size => this.afterGetSizeFromSetting(size));
  }
}

