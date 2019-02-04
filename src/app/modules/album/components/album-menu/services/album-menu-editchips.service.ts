import { Injectable } from '@angular/core';
import {DialogAddComponent} from '../../../../chips/dialogs/dialog-add/dialog-add.component';
import {MatDialog} from '@angular/material';
import {Album} from '../../../../../classes/music/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuEditchipsService {
  private option =     {
    label: 'Bewerk album chips',
    action: this.editChips.bind(this),
    icon: 'edit',
    color: 'orange',
  };
  private album: Album;

  constructor(
    private dialog: MatDialog,
  ) { }

  private editChips() {
    this.dialog.open(DialogAddComponent, {
      data: {
        album: this.album
      }
    });
  }

  menu2(album: Album) {
    this.album = album;
    return this.option;
  }
}
