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
  // moving = false;
  // yStart: number;
  // yEnd: number;
  created: string[] = [];
  @ViewChildren(MatCheckbox, { read: ElementRef }) checkBoxes: QueryList<MatCheckbox>;

  constructor(private musicService: MusicService,
              private pieceService: PieceService,
              public dialogRef: MatDialogRef<DialogPiecesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  // getPieceById(id) {
  //   for (let i = 0; i < this.data.pieces.length; i++) {
  //     if (this.data.pieces[i].ID === id) {
  //       return this.data.pieces[i];
  //     }
  //   }
  //   return null;
  // }

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

  similar() {
    const titles = [],
     ids = [];
    let active = false,
      common = '',
      old_common = '';
    for (let i = 0; i < this.data.pieces; i++) {
      const piece: Piece = this.data.pieces[i];
      if (piece.checked) {
        active = true;
      }
      if (active) {
        piece.checked = false;
        ids.push(piece.ID);
        titles.push(this.pieceService.displayName(piece.Name));
        common = this.pieceService.makeCuesheetName(titles);
        if (titles.length > 2 && common.length < old_common.length - 2) {
          titles.pop();
          ids.pop();
          piece.checked = true;
          break;
        }
        old_common = common;
      }
    }
    return {
      titles: titles,
      ids: ids
    };
  }

  lcs_pieces() {
    let titles = [],
        ids = [];
    this.data.pieces.forEach((piece: Piece) => {
      if (piece.checked) {
        titles.push(this.pieceService.displayName(piece.Name));
        ids.push(piece.ID.toString());
      }
    });
    if (titles.length === 1) {
      const data = this.similar();
      titles = data.titles;
      ids = data.ids;
    }
    this.cueName = this.pieceService.makeCuesheetName(titles);
    return ids;
  }

  autoCreate() {
    this.checkOne();
    let ids = [];
    do {
      ids = this.lcs_pieces();
      if (ids.length) {
        this.musicService.makeCuesheet(this.cueName, ids,
          this.data.albumId).subscribe(
          () => this.created.push(this.cueName)
        );
      }
    } while (ids.length);
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
