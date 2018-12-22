import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Person} from '../../classes/Person';
import {Tag} from '../../classes/Tag';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {MusicService} from '../../services/music.service';
import {AlbumDetailsComponent} from '../../components/album-details/album-details.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogInputComponent} from '../dialog-input/dialog-input.component';
import {Instrument} from '../../classes/Instrument';
import {ChoiceService} from '../../services/choice.service';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {

  composers: Person[];
  performers: Person[];
  instruments: Instrument[];
  tags: Tag[];
  labelAdd = 'add';
  labelNew = 'new';
  choices;
  nameComposer = 'composer';
  namePerformer = 'performer';
  nameTag = 'tag';
  nameInstrument = 'instrument';

  constructor(private musicService: MusicService,
              public dialogRef: MatDialogRef<AlbumDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private choiceService: ChoiceService,
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

  addTag(id) {
    this.musicService.addTag(id, this.data.album.ID).subscribe(
      (response) => this.afterNewTag(response)
    );
  }

  newTag() {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new tag'
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

  afterNewInstrument(response: Instrument) {
    this.data.album.album_instrument = response;
  }

  addInstrument(id) {
    this.musicService.addInstrument(id, this.data.album.ID).subscribe(
      response => this.afterNewInstrument(<Instrument>response)
    );
  }

  newInstrument() {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new instrument'
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.musicService.newInstrument(name, this.data.album.ID).subscribe(
            response => this.afterNewInstrument(<Instrument>response)
          );
        }
      }
    );
  }

  afterNewPerformer(response) {
    this.data.album.album_performers.push(response);
  }

  addPerformer(id) {
    this.musicService.addPerformer(id, this.data.album.ID).subscribe(
      (response) => this.afterNewPerformer(response)
    );
  }

  newPerformer() {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new performer'
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

  addComposer(id) {
    this.musicService.addComposer(id, this.data.album.ID).subscribe(
      (response) => this.afterNewComposer(response),
      (error) => console.error(error)
    );
  }

  newComposer() {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new composer'
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

  addItem(choice) {
    switch (choice.name) {
      case this.nameComposer:
        this.addComposer(choice.id);
        break;
      case this.namePerformer:
        this.addPerformer(choice.id);
        break;
      case this.nameTag:
        this.addTag(choice.id);
        break;
      case this.nameInstrument:
        this.addInstrument(choice.id);
        break;
    }
  }

  newItem(choice) {
    switch (choice.name) {
      case this.nameComposer:
        this.newComposer();
        break;
      case this.namePerformer:
        this.newPerformer();
        break;
      case this.nameTag:
        this.newTag();
        break;
      case this.nameInstrument:
        this.newInstrument();
        break;
    }
  }

  makeChoices() {
    this.choices = [
      {
        name: this.nameComposer,
        placeholder: 'Componist',
        displayfield: 'FullName',
        items: this.composers,
        id: -1,
      },
      {
        name: this.namePerformer,
        placeholder: 'Performer',
        displayfield: 'FullName',
        items: this.performers,
        id: -1,
      },
      {
        name: this.nameTag,
        placeholder: 'Tag',
        displayfield: 'Name',
        items: this.tags,
        id: -1,
      },
      {
        name: this.nameInstrument,
        placeholder: 'Instrument',
        displayfield: 'Name',
        items: this.instruments,
        id: -1,
      },

    ];
    // console.log(this.choices);
  }

  afterGetItems(results) {
    this.composers = <Person[]>results[0];
    this.performers = <Person[]>results[1];
    this.tags = <Tag[]>results[2];
    this.instruments = <Instrument[]>results[3];
    this.makeChoices();
  }

  getItems() {
    const qcomposers = this.musicService.getComposers('typeahead');
    const qperformers = this.musicService.getPerformers('typeahead');
    const qtags = this.musicService.getTags();
    const qinstruments = this.musicService.getInstruments();
    forkJoin(qcomposers, qperformers, qtags, qinstruments)
      .subscribe(
        (results) => this.afterGetItems(results),
        err => console.error(err),
        () => {
        }
      );
  }

  ngOnInit() {
    this.getItems();
  }

}
