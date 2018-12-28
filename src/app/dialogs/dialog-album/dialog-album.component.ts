import {Component, Inject, OnInit} from '@angular/core';
import {Album} from '../../classes/Album';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlbumMenuComponent} from '../../components/album-menu/album-menu.component';
import {MusicService} from '../../services/music.service';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-dialog-album',
  templateUrl: './dialog-album.component.html',
  styleUrls: ['./dialog-album.component.scss']
})
export class DialogAlbumComponent implements OnInit {
  // from data
  albumId: number;
  title: string;
  description: string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlbumMenuComponent>,
    private musicService: MusicService,
  ) { }

  afterSuccess() {
    this.dialogRef.close({
      result: 'save',
      title: this.title,
      description: this.description
    });
  }

  submit() {
    const uTitle = this.musicService.updateAlbumTitle(
      this.albumId, this.title);
    const uDescription = this.musicService.updateAlbumDescription(
      this.albumId, this.description);
    forkJoin(uTitle, uDescription).subscribe(
      success => this.afterSuccess(),
      err => console.log(err)
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
    this.albumId = album.ID;
  }

}
