import {Component, Inject, OnInit} from '@angular/core';
import {Person} from '../classes/Person';
import {Tag} from '../classes/Tag';
// import {Album} from '../classes/Album';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {MusicService} from '../music.service';
import {AlbumDetailsComponent} from '../album-details/album-details.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {

  selectedComposer: Person = null;
  selectedPerformer: Person = null;
  selectedTag: Tag = null;
  composers: Person[];
  performers: Person[];
  tags: Tag[];

  constructor(private musicService: MusicService,
              public dialogRef: MatDialogRef<AlbumDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) { }

  select(e) {
    e.target.select();
  }

  displayNameFn(person): string {
    return person ? person.Name : person;
  }

  getTypeAheads() {
    const selection = null;
    const qcomposers = this.musicService.getComposers(selection);
    const qperformers = this.musicService.getPerformers(selection);
    const qtags = this.musicService.getTags(selection);
    forkJoin(qcomposers, qperformers, qtags)
      .subscribe(
        (results) => {
          this.composers = <Person[]>results[0];
          this.performers = <Person[]>results[1];
          this.tags = <Tag[]>results[2];
        },
        err => console.error(err),
        () => {
          console.log('all three collections are fetched');
        }
      );
  }

  getFullName(person: Person) {
    const parts = person.Name.split(', ');
    if (parts.length > 1) {
      return parts[1] + ' ' + parts[0];
    }
    return person.Name;
  }

  onComposerAdded(response) {
    console.log(response);
    // console.log(this.selectedComposer);
    // console.log(this.data.album.album_componisten);
    const composer = this.selectedComposer;
    composer.FullName = this.getFullName(composer);
    this.data.album.album_componisten.push(composer);
  }

  onComposerChange() {
    this.musicService.addComposer(this.selectedComposer.ID, this.data.album.ID)
      .subscribe(
        (response) => this.onComposerAdded(response)
      );
  }

  onPerformerAdded(response) {
    console.log(response);
    const performer = this.selectedPerformer;
    performer.FullName = this.getFullName(performer);
    this.data.album.album_performers.push(performer);
  }

  onPerformerChange() {
    this.musicService.addPerformer(this.selectedPerformer.ID, this.data.album.ID)
      .subscribe(
        (response) => this.onPerformerAdded(response)
      );
  }

  onTagAdded(response) {
    console.log(response);
    this.data.album.album_tags.push(this.selectedTag);
  }

  onTagChange() {
    this.musicService.addTag(this.selectedTag.ID, this.data.album.ID)
      .subscribe(
        (response) => this.onTagAdded(response)
      );
  }

  ngOnInit() {
    this.getTypeAheads();
  }

}
