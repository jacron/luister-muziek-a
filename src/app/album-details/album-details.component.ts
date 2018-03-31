import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {environment} from '../../environments/environment';
import {MusicService} from '../music.service';
import {MatDialog} from '@angular/material';
import {DialogPicComponent} from '../dialog-pic/dialog-pic.component';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, AfterViewInit {
  imgUrl = environment.apiServer + '/image/';
  imgBackUrl = environment.apiServer + '/imageback/';
  @Input('album') album: Album;
  chevron = 'keyboard_arrow_down';
  objectKeys = Object.keys;

  constructor(
    private musicService: MusicService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private storageService: StorageService
  ) {     route.params.subscribe(params => this.handleParams(params));
  }

  openAlbum(album: Album): void {
    this.album = album;
    // console.log(album);
  }

  handleParams(params) {
    if (params) {
      this.musicService.getAlbumById(params.idalbum).subscribe(
        (album: Album) => this.openAlbum(album),
        err => console.error(err),
        () => console.log('album fetched')
      );
    }
  }

  openPic(mode): void {
    const imgUrl = this.imgUrl + this.album.ID + '/album';
    const backUrl = this.album.album_back_image ? this.imgBackUrl + this.album.ID + '/album' : null;
    this.dialog.open(DialogPicComponent, {
      width: '80%',
      data: {
        imgUrl: imgUrl,
        backUrl: backUrl,
        mode: mode
      }
    });
  }

  toggle() {
    this.album.expanded = !this.album.expanded;
    this.chevron = this.album.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  ngAfterViewInit() {
    // console.log(this.album);
  }

  ngOnInit() {
    console.log(this.storageService.retrieveAlbums());
    console.log(this.storageService.retrieveSearchTitle());
  }

}

