import {Component, Input, OnInit} from '@angular/core';
import {Piece} from '../../../../../classes/music/Piece';
import {MusicService} from '../../../services/music.service';
import {PieceService} from '../../services/piece.service';
import {Album} from '../../../../../classes/music/Album';
import {DialogInputComponent} from '../../dialogs/dialog-input/dialog-input.component';
import {MatDialog} from '@angular/material';
import {UtilService} from '../../../../../services/util.service';

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
    private pieceService: PieceService,
    private dialog: MatDialog,
    private utilService: UtilService,
  ) { }

  toCode(code) {
    console.log(code);
  }

  onPlayed(response, id) {
    const pieces = this.pieces.filter(piece => piece.ID == id);
    pieces[0].played = true;
  }

  play2(e, id) {
    e.stopPropagation();
    this.musicService.play2(id).subscribe(
      (response) => this.onPlayed(response, id)
    );
  }

  play(e, id) {
    e.stopPropagation();
    this.musicService.play(id).subscribe(
      (response) => this.onPlayed(response, id)
    );
  }

  openPieces() {
    this.album.expanded = !this.album.expanded;
    this.chevron = this.album.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  removeCode(piece: Piece) {
    console.log('not implemented: remove', piece);
  }

  displayName(s) {
    return this.pieceService.displayName(s);
  }

  afterRenameTitle(title: string, piece: Piece) {
    // const extension = this.utilService.getExtension(piece.Name)
    // piece.Name = title + extension;
    piece.Name = title;
  }

  editPieceName(e, piece: Piece) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(DialogInputComponent, {
      width: '75%',
      data: {
        prompt: '',
        default: this.utilService.stripExtension(piece.Name)
      }
    });
    dialogRef.afterClosed().subscribe(
      title => {
        if (title && title.length > 0) {
          const extension = this.utilService.getExtension(piece.Name);
          // console.log(title + extension);
          this.musicService.updatePieceName(piece.ID, this.album.ID, title + extension)
            .subscribe(
              () => this.afterRenameTitle(title, piece)
            );
        }
      }
    );
  }

  ngOnInit() {
  }

}
