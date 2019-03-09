import {Component, Inject, OnInit} from '@angular/core';
import {Person} from '../../../../../classes/music/Person';
import {Tag} from '../../../../../classes/music/Tag';
import {forkJoin} from 'rxjs';
import {MusicService} from '../../../services/music.service';
import {AlbumDetailsComponent} from '../../../album/components/album-details/album-details.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogInputComponent} from '../../../album/dialogs/dialog-input/dialog-input.component';
import {Instrument} from '../../../../../classes/music/Instrument';
import {Album} from '../../../../../classes/music/Album';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {

  // from data
  album: Album;

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
              ) { }

  close(e) {
    // console.log('result dialog person: ', e);
    if (e === 'leave') {
      this.dialogRef.close(e);
    }
  }

  afterNewTag(response, choice) {
    this.album.album_tags.push(response);
    choice.text = '';
  }

  addTag(choice) {
    this.musicService.addTag(choice.id, this.album.ID).subscribe(
      (response) => this.afterNewTag(response, choice)
    );
  }

  newTag(choice) {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new tag',
        default: choice.text,
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
            this.musicService.newTag(name, this.album.ID).subscribe(
              response => this.afterNewTag(response, choice)
            );
        }
      }
    );
  }

  afterNewInstrument(response: Instrument, choice) {
    this.album.album_instrument = response;
    choice.text = '';
  }

  addInstrument(choice) {
    this.musicService.addInstrument(choice.id, this.album.ID).subscribe(
      response => this.afterNewInstrument(<Instrument>response, choice)
    );
  }

  newInstrument(choice) {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new instrument',
        default: choice.text,
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.musicService.newInstrument(name, this.album.ID).subscribe(
            response => this.afterNewInstrument(<Instrument>response, choice)
          );
        }
      }
    );
  }

  afterAddPerformer(response, choice, mockPerformer) {
    this.album.album_performers.push(mockPerformer);
    choice.text = '';
  }

  addPerformer(choice) {
    const mockPerformer = {
      FullName: choice.items.find(item => item.ID === choice.id).FullName,
      ID: choice.id
    };
    this.musicService.addPerformer(choice.id, this.album.ID).subscribe(
      (response) => this.afterAddPerformer(response, choice, mockPerformer)
    );
  }

  afterNewPerformer(response, choice) {
    this.album.album_performers.push(response);
    choice.text = '';
  }

  newPerformer(choice) {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new performer',
        default: choice.text,
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.musicService.newPerformer(name, this.album.ID).subscribe(
            response => this.afterNewPerformer(response, choice)
          );
        }
      }
    );
  }

  afterAddComposer(response, choice, mockComposer) {
    this.album.album_componisten.push(mockComposer);
    choice.text = '';
  }

  addComposer(choice) {
    const mockComposer = {
      FullName: choice.items.find(item => item.ID === choice.id).FullName,
      ID: choice.id
    };
    this.musicService.addComposer(choice.id, this.album.ID).subscribe(
      (response) => this.afterAddComposer(response, choice, mockComposer),
      (error) => console.error(error)
    );
  }

  afterNewComposer(response, choice, ) {
    this.album.album_componisten.push(response);
    choice.text = '';
  }

  newComposer(choice) {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new composer',
        default: choice.text,
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.musicService.newComposer(name, this.album.ID).subscribe(
            response => this.afterNewComposer(response, choice)
          );
        }
      }
    );
  }

  addItem(choice) {
    switch (choice.name) {
      case this.nameComposer:
        this.addComposer(choice);
        break;
      case this.namePerformer:
        this.addPerformer(choice);
        break;
      case this.nameTag:
        this.addTag(choice);
        break;
      case this.nameInstrument:
        this.addInstrument(choice);
        break;
    }
    choice.id = -1;
  }

  newItem(choice) {
    switch (choice.name) {
      case this.nameComposer:
        this.newComposer(choice);
        break;
      case this.namePerformer:
        this.newPerformer(choice);
        break;
      case this.nameTag:
        this.newTag(choice);
        break;
      case this.nameInstrument:
        this.newInstrument(choice);
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
    this.album = this.data.album;
  }

}
