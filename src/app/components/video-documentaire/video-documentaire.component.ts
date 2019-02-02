import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-video-documentaire',
  templateUrl: './video-documentaire.component.html',
  styleUrls: ['./video-documentaire.component.scss']
})
export class VideoDocumentaireComponent implements OnInit {
  videoalbums;

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
  ) { }

  afterGetAlbums(results) {
    console.log(results);
    this.videoalbums = results;
    this.stateService.setTitle('Muziekvideo\'s Documentaire');
  }

  getAlbums() {
    this.musicService.getVideoAlbums('documentary').subscribe(
      results => this.afterGetAlbums(results)
    );
  }

  ngOnInit() {
    this.getAlbums();
  }

}
