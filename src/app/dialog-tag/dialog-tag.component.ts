import {Component, Inject, OnInit} from '@angular/core';
import {AlbumDetailsComponent} from '../album-details/album-details.component';
import {MusicService} from '../music.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.scss']
})
export class DialogTagComponent implements OnInit {

  constructor(private musicService: MusicService,
              public dialogRef: MatDialogRef<AlbumDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  titleKeydown(e, id, title) {
    // if (e.key === 'Enter') {
    //   this.musicService.updateCuesheetTitle(id, this.data.albumid, title).subscribe(
    //     (response) => console.log(response)
    //   );
    //   e.preventDefault();
    // }
    // if (e.key === 'Tab') {
    //   this.musicService.updateCuesheetTitle(id, this.data.albumid, title).subscribe(
    //     (response) => console.log(response)
    //   );
    // }
  }

  ngOnInit() {
  }

}
