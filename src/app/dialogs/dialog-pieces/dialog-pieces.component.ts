import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatCheckbox, MatDialogRef} from '@angular/material';
import {MusicService} from '../../services/music.service';
import {Piece} from '../../classes/Piece';
import {PieceService} from '../../services/piece.service';
import {Album} from '../../classes/Album';

@Component({
  selector: 'app-dialog-pieces',
  templateUrl: './dialog-pieces.component.html',
  styleUrls: ['./dialog-pieces.component.scss']
})
export class DialogPiecesComponent implements OnInit {
  cueName: string;
  created: string[] = [];
  @ViewChildren(MatCheckbox, { read: ElementRef }) checkBoxes: QueryList<MatCheckbox>;

  constructor(private musicService: MusicService,
              private pieceService: PieceService,
              public dialogRef: MatDialogRef<DialogPiecesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onPieceCheck(e, piece: Piece) {
    if (!this.cueName) {
      this.cueName = this.displayName(piece.Name);
    }
  }

  onPieceClick(e, piece: Piece, i: number, matselection) {
    if (!piece.checked) {
      this.pieceService.selectSiblingsInbetween(e, i, this.data.pieces);
    }
  }

  restorePieces(album: Album) {
    this.data.album.pieces = album.pieces;
    this.data.album.cuesheets = album.cuesheets;
    this.dialogRef.close();
  }

  reload() {
    this.musicService.refetch(this.data.albumId).subscribe(
      (response: Album) => this.restorePieces(response)
    );

  }

  lcs() {
    const lines = [];
    this.data.pieces.forEach((piece: Piece) => {
      if (piece.checked) {
        const name = this.pieceService.displayName(piece.Name);
        lines.push(name);
      }
    });
    this.cueName = this.pieceService.makeCuesheetName(lines);
  }

  displayName(s) {
    return this.pieceService.displayName(s);
  }

  nameKeydown(e, piece: Piece, name) {
    if (e.key === 'Enter') {
      this.pieceService.updatePieceName(piece.ID, piece.Name, name,
        this.data.albumId);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.pieceService.updatePieceName(piece.ID, piece.Name, name,
        this.data.albumId);
    }
  }

  piecesSelected() {
    let n = 0;
    for (let i = 0; i < this.data.pieces.length; i++) {
      if (this.data.pieces[i].checked) {
        n++;
      }
    }
    return n;
  }

  selectAllPieces(mode) {
    this.data.pieces.forEach((piece) => {
      piece.checked = mode;
    });
    if (!mode) {
      this.cueName = '';
    }
  }

  checkOne() {
    const ids = this.getIds();
    if (!ids.length) {
      this.data.pieces[0].checked = true;
    }
  }

  autoCreate() {
    this.checkOne();
    const that = this;
    this.pieceService.autoCuesheets(this.data.albumId, this.data.pieces).then(
      (titles: string[]) => that.created = titles
    );
  }

  getIds() {
    const ids = [];
    this.data.pieces.forEach((piece: Piece) => {
      if (piece.checked) {
        ids.push(piece.ID.toString());
        piece.created = true;
      }
    });
    return ids;
  }

  createCue() {
    const ids = this.getIds(),
          that = this;
    this.musicService.makeCuesheet(this.cueName, ids,
      this.data.albumId).subscribe(
      () => that.created.push(that.cueName)
    );
  }

  ngOnInit() {
    // testing
    // this.created = ['aap', 'noot', 'mies'];
  }

}
