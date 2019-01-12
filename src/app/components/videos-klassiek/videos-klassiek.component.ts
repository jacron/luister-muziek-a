import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-videos-klassiek',
  templateUrl: './videos-klassiek.component.html',
  styleUrls: ['./videos-klassiek.component.scss']
})
export class VideosKlassiekComponent implements OnInit {
  videoalbums;

  constructor(
    private musicService: MusicService,
  ) { }

  afterGetAlbums(results) {
    console.log(results);
    this.videoalbums = results;
  }

  getAlbums() {
    this.musicService.getVideoAlbums('classical').subscribe(
      results => this.afterGetAlbums(results)
    )
  }

  ngOnInit() {
    this.getAlbums();
  }

}
