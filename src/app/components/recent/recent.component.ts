import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {
  items;
  imgUrl = environment.apiServer + '/image/';

  constructor(
    private musicService: MusicService,
  ) { }

  getItemByPieceId(id) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.Piece.ID === id) {
        return item;
      }
    }
    return null;
  }

  onPlayed(response, id) {
    // console.log('playing', response);
    const item = this.getItemByPieceId(id);
    item.played = true;
  }

  play(id) {
    this.musicService.play(id).subscribe(
      (response) => this.onPlayed(response, id)
    );
  }

  afterGetPieces(response) {
    this.items = response;
  }

  ngOnInit() {
    this.musicService.getPiecesRecentlyPlayed().subscribe(
      response => this.afterGetPieces(response)
    );
  }

}
