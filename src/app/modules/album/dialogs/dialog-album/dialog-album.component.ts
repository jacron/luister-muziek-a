import {Component, Inject, OnInit} from '@angular/core';
import {Album} from '../../../../classes/music/Album';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlbumMenuComponent} from '../../components/album-menu/album-menu.component';
import {MusicService} from '../../../../services/music.service';
// import {forkJoin} from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-dialog-album',
  templateUrl: './dialog-album.component.html',
  styleUrls: ['./dialog-album.component.scss']
})
export class DialogAlbumComponent implements OnInit {
  albumId: number;  // from data

  title: string;
  description: string;
  ASIN: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlbumMenuComponent>,
    private musicService: MusicService,
  ) { }

  afterSuccess() {
    this.dialogRef.close({
      result: 'save',
      title: this.title,
      description: this.description,
      ASIN: this.ASIN,
    });
  }

  submit() {
    this.musicService.updateAlbum(
      this.albumId,
      this.title,
      this.description,
      this.ASIN,
    ).subscribe(
      () => this.afterSuccess()
    );
  }

  cancel() {
    this.dialogRef.close({
      result: 'cancel'
    });
  }

  ngOnInit() {
    const album: Album = this.data.album;
    this.title = album.Title;
    this.description = album.Description;
    this.ASIN = album.ASIN;
    this.albumId = album.ID;
  }

}
