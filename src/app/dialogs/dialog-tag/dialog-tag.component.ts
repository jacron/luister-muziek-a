import {Component, Inject, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {ChipListsComponent} from '../../components/chip-lists/chip-lists.component';

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.scss']
})
export class DialogTagComponent implements OnInit {

  tagname: string;
  albumCount: number;
  model;

  constructor(private musicService: MusicService,
              private router: Router,
              public dialogRef: MatDialogRef<DialogTagComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  afterUpdate(response, name) {
    console.log(response);
    this.data.tag.Name = name;
  }

  updateText(name) {
      this.musicService.updateAlbumTagName(this.data.tag.ID, name).subscribe(
        (response) => this.afterUpdate(response, name)
      );
  }

  titleKeydown(e, name) {
    if (e.key === 'Enter') {
      this.updateText(name);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updateText(name);
    }
  }

  toSearch() {
    this.router.navigate(['/search',
      {
        idcomp: -1,
        idperf: -1,
        idcoll: -1,
        idtag: this.data.tag.ID
      }
    ]).then();
  }

  onNoClick(): void {
    console.log('no click');
    this.dialogRef.close('cancel');
  }

  afterAlbumCount(response) {
    console.log(response);
    this.albumCount = response;
  }

  ngOnInit() {
    this.tagname = this.data.tag.Name;
    this.musicService.getAlbumCountForTag(this.data.tag.ID).subscribe(
      (response) => this.afterAlbumCount(response)
    );
  }

}
