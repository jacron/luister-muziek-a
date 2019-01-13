import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-videos-pop',
  templateUrl: './videos-pop.component.html',
  styleUrls: ['./videos-pop.component.scss']
})
export class VideosPopComponent implements OnInit {
  videoalbums;

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
  ) { }

  afterGetAlbums(results) {
    console.log(results);
    this.videoalbums = results;
    this.stateService.setTitle('Muziekvideo\'s Pop');
  }

  getAlbums() {
    this.musicService.getVideoAlbums('pop').subscribe(
      results => this.afterGetAlbums(results)
    )
  }

  ngOnInit() {
    this.getAlbums();
  }

}
