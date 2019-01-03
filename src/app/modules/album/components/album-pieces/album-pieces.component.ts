import {Component, Input, OnInit} from '@angular/core';
import {Piece} from '../../../../classes/Piece';
import {MusicService} from '../../../../services/music.service';
import {PieceService} from '../../services/piece.service';
import {Album} from '../../../../classes/Album';

@Component({
  selector: 'app-album-pieces',
  templateUrl: './album-pieces.component.html',
  styleUrls: ['./album-pieces.component.scss']
})
export class AlbumPiecesComponent implements OnInit {
  @Input() pieces: Piece[];
  @Input() album: Album;
  @Input() idpiece = -1;
  chevron = 'keyboard_arrow_down';
  removable = false;

  constructor(
    private musicService: MusicService,
    private pieceService: PieceService
  ) { }

  toCode(code) {
    console.log(code);
  }

  onPlayed(response, id) {
    const pieces = this.pieces.filter(piece => piece.ID == id);
    pieces[0].played = true;
  }

  play(id) {
    this.musicService.play(id).subscribe(
      (response) => this.onPlayed(response, id)
    );
  }

  openPieces() {
    this.album.expanded = !this.album.expanded;
    this.chevron = this.album.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  removeCode(piece: Piece) {
    console.log('not implemented: remove', piece)
  }

  displayName(s) {
    return this.pieceService.displayName(s);
  }

  ngOnInit() {
  }

}
