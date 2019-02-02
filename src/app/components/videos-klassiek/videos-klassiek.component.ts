import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-videos-klassiek',
  templateUrl: './videos-klassiek.component.html',
  styleUrls: ['./videos-klassiek.component.scss']
})
export class VideosKlassiekComponent implements OnInit {
  videoalbums;

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
  ) { }

  afterGetAlbums(results) {
    console.log(results);
    this.videoalbums = results;
    this.stateService.setTitle('Muziekvideo\'s Klassiek');
  }

  getAlbums() {
    this.musicService.getVideoAlbums('classical').subscribe(
      results => this.afterGetAlbums(results)
    );
  }

  ngOnInit() {
    this.getAlbums();
  }

}
