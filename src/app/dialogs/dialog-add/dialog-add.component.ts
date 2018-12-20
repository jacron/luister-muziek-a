import {Component, Inject, OnInit} from '@angular/core';
import {Person} from '../../classes/Person';
import {Tag} from '../../classes/Tag';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {MusicService} from '../../services/music.service';
import {AlbumDetailsComponent} from '../../components/album-details/album-details.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogInputComponent} from '../dialog-input/dialog-input.component';

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
  labelNew = 'new';

  constructor(private musicService: MusicService,
              public dialogRef: MatDialogRef<AlbumDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
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

  newTag() {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new tag: '
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
            this.musicService.newTag(name, this.data.album.ID).subscribe(
              response => this.afterNewTag(response)
            );
        }
      }
    );
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

  newPerformer() {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new performer: '
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.musicService.newPerformer(name, this.data.album.ID).subscribe(
            response => this.afterNewPerformer(response)
          );
        }
      }
    );
  }

  afterNewComposer(response) {
    this.data.album.album_componisten.push(response);
  }

  addComposer() {
    if (this.idcomp !== -1) {
      console.log(this.idcomp);
      this.musicService.addComposer(this.idcomp, this.data.album.ID).subscribe(
        (response) => this.afterNewComposer(response),
        (error) => console.error(error)
      );
    }
  }

  newComposer() {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new composer: '
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.musicService.newComposer(name, this.data.album.ID).subscribe(
            response => this.afterNewComposer(response)
          );
        }
      }
    );

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
