import { Injectable } from '@angular/core';
import {DialogPiecesComponent} from '../../../dialogs/dialog-pieces/dialog-pieces.component';
import {Album} from '../../../../../classes/music/Album';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuCuesheetsmakerService {
  private option =     {
    label: 'Cuesheets maker',
    action: this.editPieces.bind(this),
    icon: 'edit',
    color: 'blue',
  };
  private album: Album;

  constructor(
    private dialog: MatDialog,
  ) { }

  private editPieces() {
    const dialogRef = this.dialog.open(DialogPiecesComponent, {
      data: {
        pieces: this.album.pieces,
        albumId: this.album.ID,
        album: this.album
      }
    });
    dialogRef.afterClosed().subscribe(
      // result => {
        // console.log(result);
        // todo: remove reload - also in parent - as it messes up aliasses
        // if (result == 'reload') {
        //   this.reload.emit(result);
        // }
      // }
    );
  }

  menu(album: Album) {
    this.album = album;
    return this.option;
  }
}
