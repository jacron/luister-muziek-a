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

  handleParams(params) {
    if (params) {
      console.log(params);
      this.musicService.getAlbumById(params.id).subscribe(
        (album: Album) => this.album = album,
        err => console.error(err),
        () => console.log('componist albums fetched')
      );
    }
  }

  // updateAlbumTitle(id, title) {
  //   this.musicService.updateAlbumTitle(id, title).subscribe(
  //     (msg) => console.log(msg)
  //   );
  // }

  // albumTitleKeydown(e, id, title) {
  //   console.log(id, title);
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     this.updateAlbumTitle(id, title);
  //   }
  //   if (e.key === 'Tab') {
  //     this.updateAlbumTitle(id, title);
  //   }
  // }

  ngOnInit() {
  }

}
