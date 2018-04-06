import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
// import {AlbumDetailsComponent} from '../album-details/album-details.component';
import {MAT_DIALOG_DATA, MatCheckbox} from '@angular/material';
import {MusicService} from '../music.service';
import {Piece} from '../classes/Piece';
import {PieceService} from '../piece.service';

@Component({
  selector: 'app-dialog-pieces',
  templateUrl: './dialog-pieces.component.html',
  styleUrls: ['./dialog-pieces.component.scss']
})
export class DialogPiecesComponent implements OnInit {
  cueName: string;
  moving = false;
  yStart: number;
  yEnd: number;
  @ViewChildren(MatCheckbox, { read: ElementRef }) checkBoxes: QueryList<MatCheckbox>;

  constructor(private musicService: MusicService,
              private pieceService: PieceService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  getPieceById(id) {
    for (let i = 0; i < this.data.pieces.length; i++) {
      if (this.data.pieces[i].ID === id) {
        return this.data.pieces[i];
      }
    }
    return null;
  }

  onPieceCheck(e, piece: Piece) {
    if (!this.cueName) {
      this.cueName = this.displayName(piece.Name);
    }
  }

  onPieceClick(e, piece: Piece, i: number) {
    if (!piece.checked) {
      this.pieceService.selectSiblingsInbetween(e, i, this.data.pieces);
    }
  }

  lcs() {
    const lines = [];
    this.data.pieces.forEach((piece: Piece) => {
      if (piece.checked) {
        lines.push(piece.Name);
      }
    });
    let name = this.pieceService.lcs(lines).trim();
    if (name.endsWith(':')) {
      name = name.substr(0, name.length - 1);
    }
    this.cueName = name;
  }

  displayName(s) {
    return this.pieceService.displayName(s);
  }

  selectAllPieces(mode) {
    this.data.pieces.forEach((piece) => {
      piece.checked = mode;
    });

  }

  createCue() {
    const ids = [];
    this.data.pieces.forEach((piece) => {
      if (piece.checked) {
        ids.push(piece.ID.toString());
      }
    });
    console.log(ids);
    this.musicService.makeCuesheet(this.cueName, ids, this.data.albumId).subscribe();
  }

  // onMouseDown(e) {
  //   console.log('down', e);
  //   this.moving = true;
  //   this.yStart = e.clientY;
  // }
  //
  // onMouseMove(e) {
  //   // if (this.moving) {
  //     // console.log('move', e);
  //   // }
  // }
  //
  // onMouseUp(e) {
  //   console.log('up', e);
  //   this.moving = false;
  //   this.yEnd = e.clientY;
  //   console.log(this.checkBoxes);
  //   const ids = [];
  //   this.checkBoxes.forEach((box) => {
  //     // console.log(box);
  //     const top = box.nativeElement.offsetTop,
  //       id = box.nativeElement.id;
  //     console.log(top, id);
  //     if (this.yStart < top && top < this.yEnd) {
  //       const parts = id.split('-');
  //       ids.push(+parts[2]);
  //     }
  //   });
  //   console.log(ids);
  //   const pieces = this.data.pieces;
  //   for (let k = 0; k < pieces.length; k++) {
  //     ids.forEach((id) => {
  //       if (k === id) {
  //         pieces[k].checked = true;
  //       }
  //     });
  //   }
  // }

  ngOnInit() {
  }

}
