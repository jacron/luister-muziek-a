import { Injectable } from '@angular/core';
import {DialogAlbumComponent} from '../dialogs/dialog-album/dialog-album.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(
    private dialog: MatDialog,
  ) { }

  rename(album) {
    const dialogRef = this.dialog.open(DialogAlbumComponent, {
      width: '600px',
      data: {
        album: album
      }
    });
    return dialogRef.afterClosed();
  }

}
