import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Albums} from '../classes/Albums';
import {MusicService} from '../music.service';
import {Album} from '../classes/Album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album: Album;

  constructor(private musicService: MusicService,
              private route: ActivatedRoute,
  ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  openAlbum(album: Album): void {
    this.album = album;
    console.log(album);
  }

  handleParams(params) {
    if (params) {
      // console.log(params);
      this.musicService.getAlbumById(params.idalbum).subscribe(
        (album: Album) => this.openAlbum(album),
        err => console.error(err),
        () => console.log('componist albums fetched')
      );
    }
  }

  ngOnInit() {
  }

}
