import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../../../../classes/music/Album';
import {environment} from '../../../../../../environments/environment';
import {MusicService} from '../../../services/music.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StateService} from '../../../../../services/state.service';
import {AlbumService} from '../../services/album.service';
import {SettingsService} from '../../../../../services/settings.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  @Input() album: Album;

  imgUrl = environment.musicServer + '/image/';
  imgBackUrl = environment.musicServer + '/image/back/';
  imgTime = new Date();
  imgSrc;
  idpiece = -1;
  coverSize = -1;

  constructor(
    private musicService: MusicService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: StateService,
    private albumService: AlbumService,
    private settingsService: SettingsService,
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

  albumImage() {
    // {{ imgUrl }}{{ album.ID }}/album/-1/{{ coverSize }}
    return `${this.imgUrl}${this.album.ID}/album/-1/${this.coverSize}?stamp=${this.imgTime}`;
  }

  albumBackImage(id) {
    return `${this.imgBackUrl}${id}/album/100/-1`;
  }

  updateImage() {
    // console.log(url);
    // this.imgTime = new Date();
    // this.imgUrl = this.albumImage();
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

  openAlbum(album: Album): void {
    this.album = album;
    console.log(album);
    if (album) {
      this.imgSrc = this.albumImage();
      this.stateService.setTitle(album.Title);
      document.title = album.Title;
      if (album.cuesheets.length < 1) {
        this.album.expanded = true;
      }
      if (this.albumPiecesContainSelection(this.idpiece)) {
        this.album.expanded = true;
      }
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

  restorePieces(album: Album) {
    console.log(album);
    this.album = album;
  }

  reload(result) {
    console.log(result + ': in details');
    if (result == 'reload') {
      this.musicService.refetch(this.album.ID).subscribe(
        (response: Album) => this.restorePieces(response)
      );
    }
  }

  afterGetSizeFromSetting(size) {
    this.coverSize = size || 300;
  }

  ngOnInit() {
    this.coverSize = +this.settingsService.getCoverSize(300);
    this.settingsService.currentCoverSize.subscribe(size => this.afterGetSizeFromSetting(size));
  }
}

