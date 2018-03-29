import {Component, Input, OnInit} from '@angular/core';
import {Piece} from '../classes/Piece';
import {MusicService} from '../music.service';

@Component({
  selector: 'app-album-pieces',
  templateUrl: './album-pieces.component.html',
  styleUrls: ['./album-pieces.component.scss']
})
export class AlbumPiecesComponent implements OnInit {
  @Input('pieces') pieces: Piece[];

  constructor( private musicService: MusicService ) { }

  play(id) {
    this.musicService.play(id).subscribe(
      (response) => console.log(response)
    );
  }

  ngOnInit() {
    // console.log(this.pieces);
  }

}
