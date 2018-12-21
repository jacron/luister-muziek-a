import {Component, Input} from '@angular/core';
import {Album} from '../../classes/Album';
import {environment} from '../../../environments/environment';
import {MusicService} from '../../services/music.service';
import {MatDialog} from '@angular/material';
import {DialogPicComponent} from '../../dialogs/dialog-pic/dialog-pic.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent {
  imgUrl = environment.apiServer + '/image/';
  imgBackUrl = environment.apiServer + '/image/back/';
  @Input() album: Album;
  chevron = 'keyboard_arrow_down';

  constructor(
    private musicService: MusicService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {     route.params.subscribe(params => this.handleParams(params));
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
    }
  }

  handleParams(params) {
    if (params) {
      this.musicService.getAlbumById(params.idalbum).subscribe(
        (album: Album) => this.openAlbum(album),
        err => console.error(err),
        () => {}
      );
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

}

