import {Component, Inject, OnInit} from '@angular/core';
import {Person} from '../../classes/Person';
import {Tag} from '../../classes/Tag';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {MusicService} from '../../services/music.service';
import {AlbumDetailsComponent} from '../../components/album-details/album-details.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {

  composers: Person[];
  performers: Person[];
  tags: Tag[];
  idcomp = -1;
  idperf = -1;
  idtag = -1;
  labelAdd = 'add';

  constructor(private musicService: MusicService,
              public dialogRef: MatDialogRef<AlbumDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) { }

  close(e) {
    // console.log('result dialog person: ', e);
    if (e === 'leave') {
      this.dialogRef.close(e);
    }
  }

  afterNewTag(response) {
    this.data.album.album_tags.push(response);
  }

  addTag() {
    if (this.idtag !== -1) {
      this.musicService.addTag(this.idtag, this.data.album.ID).subscribe(
        (response) => this.afterNewTag(response)
      );
    }
  }

  afterNewPerformer(response) {
    this.data.album.album_performers.push(response);
  }

  addPerformer() {
    if (this.idperf !== -1) {
      this.musicService.addPerformer(this.idperf, this.data.album.ID).subscribe(
        (response) => this.afterNewPerformer(response)
      );
    }
  }

  afterNewComposer(response) {
    // console.log(response);
    this.data.album.album_componisten.push(response);
  }

  addComposer() {
    console.log(this.idcomp);
    if (this.idcomp !== -1) {
      console.log(this.idcomp);
      this.musicService.addComposer(this.idcomp, this.data.album.ID).subscribe(
        (response) => this.afterNewComposer(response),
        (error) => console.error(error)
      );
    }
  }

  getItems() {
    const qcomposers = this.musicService.getComposers('dropdown');
    const qperformers = this.musicService.getPerformers('dropdown');
    const qtags = this.musicService.getTags();
    forkJoin(qcomposers, qperformers, qtags)
      .subscribe(
        (results) => {
          this.composers = <Person[]>results[0];
          this.performers = <Person[]>results[1];
          this.tags = <Tag[]>results[2];
        },
        err => console.error(err),
        () => {
        }
      );
  }

  ngOnInit() {
    this.getItems();
  }

}
