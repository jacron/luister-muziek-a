import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {
  items;

  constructor(
    private musicService: MusicService,
  ) { }

  onPlayed(response, id) {
    // console.log('playing', response);
    // const cuesheet = this.getCuesheetById(id);
    // cuesheet.played = true;
  }

  play(id) {
    this.musicService.play(id).subscribe(
      (response) => this.onPlayed(response, id)
    );
  }

  afterGetPieces(response) {
    console.log(response);
    this.items = response;
  }

  ngOnInit() {
    this.musicService.getPiecesRecentlyPlayed().subscribe(
      response => this.afterGetPieces(response)
    );
  }

}
