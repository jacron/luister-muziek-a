import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlbumDetailsComponent} from '../album-details/album-details.component';

@Component({
  selector: 'app-dialog-pic',
  templateUrl: './dialog-pic.component.html',
  styleUrls: ['./dialog-pic.component.scss']
})
export class DialogPicComponent implements OnInit {

  imgUrl: string;
  mode: string;

  constructor(
    public dialogRef: MatDialogRef<AlbumDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
    }

  toggleUrl() {
    this.imgUrl = this.mode === 'front' ? this.data.imgUrl : this.data.backUrl;
  }

  toggleMode() {
    if (this.data.backUrl) {
      this.mode = this.mode === 'front' ? 'back' : 'front';
      this.toggleUrl();
    }
  }

  ngOnInit() {
    this.mode = this.data.mode;
    this.toggleUrl();
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
