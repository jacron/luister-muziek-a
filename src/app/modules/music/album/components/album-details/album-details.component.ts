import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../../../../classes/music/Album';
// import {environment} from '../../../../../../environments/environment';
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
  imgSrc;
  idpiece = -1;
  coverHeight = -1;

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
    return this.musicService.albumImageUrl(this.album.ID, -1, this.coverHeight);
  }

  albumBackImage() {
    return this.musicService.albumBackImageUrl(this.album.ID, 100, -1);
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
    const imgUrl = this.musicService.albumImageUrl(this.album.ID);  //  this.imgUrl + this.album.ID + '/album';
    const backUrl = this.musicService.albumBackImageUrl(this.album.ID);
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
    this.coverHeight = size || 300;
  }

  ngOnInit() {
    this.coverHeight = +this.settingsService.getCoverSize(300);
    this.settingsService.currentCoverSize.subscribe(size => this.afterGetSizeFromSetting(size));
  }
}

