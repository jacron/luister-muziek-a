import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../../../classes/Album';
import {Person} from '../../../../classes/Person';
import {Tag} from '../../../../classes/Tag';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {DialogPicComponent} from '../../../album/dialogs/dialog-pic/dialog-pic.component';
import {MatDialog} from '@angular/material';
import {MusicService} from '../../../../shared/services/music.service';
import {DialogPersonComponent} from '../../dialogs/dialog-person/dialog-person.component';
import {DialogTagComponent} from '../../dialogs/dialog-tag/dialog-tag.component';
import {DialogAddComponent} from '../../../album/dialogs/dialog-add/dialog-add.component';
import {DialogInstrumentComponent} from '../../dialogs/dialog-instrument/dialog-instrument.component';

@Component({
  selector: 'app-chip-lists',
  templateUrl: './chip-lists.component.html',
  styleUrls: ['./chip-lists.component.scss']
})
export class ChipListsComponent implements OnInit {

  @Input() album: Album;
  @Input() removable: boolean;
  @Input() editable: boolean;
  @Input() showimage: boolean;
  @Output() close = new EventEmitter();
  imgUrl = environment.apiServer + '/image/';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private musicService: MusicService
  ) { }

  getItemIndex(items, id) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].ID === id) {
        return i;
      }
    }
    return -1;
  }

  removeComposer(composer: Person) {
    console.log(composer);
    const items = this.album.album_componisten;
    const index = this.getItemIndex(items, composer.ID);
    this.musicService.removeComposer(composer.ID, this.album.ID).subscribe(
      () => items.splice(index, 1)
    );
  }

  removePerformer(performer: Person) {
    const items = this.album.album_performers;
    const index = this.getItemIndex(items, performer.ID);
    this.musicService.removePerformer(performer.ID, this.album.ID).subscribe(
      () => items.splice(index, 1)
  );
  }

  removeTag(tag: Tag) {
    const items = this.album.album_tags;
    const index = this.getItemIndex(items, tag.ID);
    this.musicService.removeTag(tag.ID, this.album.ID).subscribe(
      () => items.splice(index, 1)
    );
  }

  removeInstrument() {
    this.musicService.removeInstrument(this.album.album_instrument.ID,
      this.album.ID).subscribe(
      () => this.album.album_instrument = null
    );
  }

  openPicDialog(imgUrl, person: Person) {
    this.dialog.open(DialogPicComponent, {
      width: '80%',
      data: {
        imgUrl: imgUrl,
        name: person.FullName
      }
    });
  }

  openPicComposer(person: Person): void {
    this.openPicDialog(this.imgUrl + person.ID + '/componist', person);
  }

  openPicPerformer(person: Person): void {
    this.openPicDialog(this.imgUrl + person.ID + '/performer', person);
  }

  editPerson(person: Person, type: string) {
    this.dialog.open(DialogPersonComponent, {
      width: 'min-content',
      data: {
        person: person,
        type: type,
        albumid: this.album,
        personName: person.FullName
      },
      autoFocus: false,
    });
  }

  toComposer(composer: Person) {
    this.editPerson(composer, 'componist');
  }

  toPerformer(performer: Person) {
    this.editPerson(performer, 'performer');
  }

  editTag(tag: Tag) {
    this.dialog.open(DialogTagComponent, {
      width: 'min-content',
      data: {
        tag: tag
      },
      autoFocus: false
    });
  }

  toTag(tag: Tag) {
    this.editTag(tag);
  }

  toInstrument() {
    this.dialog.open(DialogInstrumentComponent, {
      width: 'min-content',
      data: {
        album: this.album
      },
      autoFocus: false
    });
  }

  afterClose(result) {
    if (result === 'leave') {
      console.log('leave?');
    }
  }

  addSome() {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      data: {
        album: this.album
      }
    });
    dialogRef.afterClosed().subscribe(
      result => this.afterClose(result)
    );
  }

  ngOnInit() {
  }

}
