import { Injectable } from '@angular/core';
import {DialogAlbumComponent} from '../../../dialogs/dialog-album/dialog-album.component';
import {MatDialog} from '@angular/material';
import {Album} from '../../../../../../classes/music/Album';
import {StateService} from '../../../../../../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuEditalbumService {
  private option =     {
    label: 'Wijzig titel',
    action: this.editAlbum.bind(this),
    icon: 'edit',
    color: '',
  };
  private album: Album;

  constructor(
    private dialog: MatDialog,
    private stateService: StateService,
  ) { }

  private afterEditAlbum(result) {
    if (result) {
      this.album.Title = result.title;
      this.album.Description = result.description;
      this.album.ASIN = result.ASIN;
      this.stateService.setTitle(result.title);
    }
  }

  private editAlbum() {
    const dialogRef = this.dialog.open(DialogAlbumComponent, {
      width: '600px',
      data: {
        album: this.album
      }
    });
    dialogRef.afterClosed().subscribe(
      result => this.afterEditAlbum(result)
    );
  }

  menu2(album: Album) {
    this.album = album;
    return this.option;
  }
}
