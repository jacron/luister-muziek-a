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
  @Input('editable') editable: boolean;

  constructor( private musicService: MusicService ) { }

  getPieceById(id) {
    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].ID === id) {
        return this.pieces[i];
      }
    }
    return null;
  }

  onPlayed(response, id) {
    console.log(response);
    const piece = this.getPieceById(id);
    piece.played = true;
  }

  play(id) {
    this.musicService.play(id).subscribe(
      (response) => this.onPlayed(response, id)
    );
  }

  createCue() {
    const ids = [];
    this.pieces.forEach((piece) => {
      // console.log(piece);
      if (piece.checked) {
        ids.push(piece.ID);
      }
    });
    console.log(ids);
  }

  ngOnInit() {
    // console.log(this.pieces);
  }

}
