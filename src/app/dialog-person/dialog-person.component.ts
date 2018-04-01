import {Component, Inject, OnInit} from '@angular/core';
import {AlbumDetailsComponent} from '../album-details/album-details.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MusicService} from '../music.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-dialog-person',
  templateUrl: './dialog-person.component.html',
  styleUrls: ['./dialog-person.component.scss']
})
export class DialogPersonComponent implements OnInit {

  imgUrl = environment.apiServer + '/image/';

  constructor(private musicService: MusicService,
              public dialogRef: MatDialogRef<AlbumDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  nameKeydown(e, id, title) {
    if (e.key === 'Enter') {
      this.musicService.updateCuesheetTitle(id, this.albumid, title).subscribe(
        (response) => console.log(response)
      );
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.musicService.updateCuesheetTitle(id, this.albumid, title).subscribe(
        (response) => console.log(response)
      );
    }
  }

  birthKeydown(e, id, title) {
    if (e.key === 'Enter') {
      this.musicService.updateCuesheetTitle(id, this.albumid, title).subscribe(
        (response) => console.log(response)
      );
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.musicService.updateCuesheetTitle(id, this.albumid, title).subscribe(
        (response) => console.log(response)
      );
    }
  }

  deathKeydown(e, id, title) {
    if (e.key === 'Enter') {
      this.musicService.updateCuesheetTitle(id, this.albumid, title).subscribe(
        (response) => console.log(response)
      );
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.musicService.updateCuesheetTitle(id, this.albumid, title).subscribe(
        (response) => console.log(response)
      );
    }
  }

  toGoogle() {

  }

  paste() {

  }

  ngOnInit() {
  }

}
