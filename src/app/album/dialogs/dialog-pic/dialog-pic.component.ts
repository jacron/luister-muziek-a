import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlbumDetailsComponent} from '../../components/album-details/album-details.component';

@Component({
  selector: 'app-dialog-pic',
  templateUrl: './dialog-pic.component.html',
  styleUrls: ['./dialog-pic.component.scss']
})
export class DialogPicComponent implements OnInit {

  imgUrl: string;
  mode: string;
  name: string;
  @ViewChild('picContainer') picContainer: ElementRef;

  constructor(
    // public dialogRef: MatDialogRef<AlbumDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private renderer: Renderer2

  ) {
    // console.log(data);
    }

  toggleUrl() {
    if (this.mode) {
      this.imgUrl = this.mode === 'front' ? this.data.imgUrl : this.data.backUrl;
    } else {
      this.imgUrl = this.data.imgUrl;
    }
  }

  toggleMode() {
    if (this.data.backUrl && this.mode) {
      this.mode = this.mode === 'front' ? 'back' : 'front';
      this.toggleUrl();
    }
  }

  ngOnInit() {
    this.mode = this.data.mode;
    this.name = this.data.name;
    this.toggleUrl();
    // const el = this.picContainer.nativeElement;
    // this.picContainer.setStyle('height: 200px');
    // this.picContainer.nativeElement.clientHeight = 200;
  }

}
