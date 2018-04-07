import {Component, Input, OnInit} from '@angular/core';
import {Piece} from '../../classes/Piece';
import {MusicService} from '../../services/music.service';
import {PieceService} from '../../services/piece.service';
import {Album} from '../../classes/Album';

@Component({
  selector: 'app-album-pieces',
  templateUrl: './album-pieces.component.html',
  styleUrls: ['./album-pieces.component.scss']
})
export class AlbumPiecesComponent implements OnInit {
  @Input('pieces') pieces: Piece[];
  @Input('album') album: Album;

  constructor(
    private musicService: MusicService,
    private pieceService: PieceService
  ) { }

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

  displayName(s) {
    return this.pieceService.displayName(s);
  }

  updatePieceName(id, name) {
    this.musicService.updatePieceName(id, this.album.ID, name)
      .subscribe(
      (response) => console.log(response)
    );
  }

  nameKeydown(e, piece: Piece, name) {
    const oldDisplayName = this.displayName(piece.Name),
          newName = piece.Name.replace(oldDisplayName, name);
    if (e.key === 'Enter') {
      this.updatePieceName(piece.ID, newName);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updatePieceName(piece.ID, newName);
    }
  }

  ngOnInit() {
    // console.log(this.pieces);
  }

}
