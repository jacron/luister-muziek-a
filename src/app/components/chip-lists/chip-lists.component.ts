import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../classes/Album';
import {Person} from '../../classes/Person';
import {Tag} from '../../classes/Tag';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {DialogPicComponent} from '../../dialogs/dialog-pic/dialog-pic.component';
import {MatDialog} from '@angular/material';
import {MusicService} from '../../services/music.service';
import {DialogPersonComponent} from '../../dialogs/dialog-person/dialog-person.component';
import {DialogTagComponent} from '../../dialogs/dialog-tag/dialog-tag.component';

@Component({
  selector: 'app-chip-lists',
  templateUrl: './chip-lists.component.html',
  styleUrls: ['./chip-lists.component.scss']
})
export class ChipListsComponent implements OnInit {

  @Input('album') album: Album;
  @Input('removable') removable: boolean;
  @Input('editable') editable: boolean;
  @Input('showimage') showimage: boolean;
  @Output('close') close = new EventEmitter();
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
    const dialogRef = this.dialog.open(DialogPersonComponent, {
      width: '50%',
      data: {
        person: person,
        type: type,
        albumid: this.album,
        personName: person.FullName
      },
      autoFocus: false,
      // hasBackdrop: false
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.close.emit(result);
    // });
    // dialogRef.keydownEvents()
    //   .filter((e: KeyboardEvent) => e.code === 'Escape')
    //   // .take(1)
    //   .subscribe(() => {
    //     // dialogRef.close();
    //     console.log('closed');
    //   });
  }

  toComposer(composer: Person) {
    this.editPerson(composer, 'componist');
  }

  toPerformer(performer: Person) {
    this.editPerson(performer, 'performer');
  }

  editTag(tag: Tag) {
    const dialogRef = this.dialog.open(DialogTagComponent, {
      width: '50%',
      data: {
        tag: tag
      },
      autoFocus: false
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.close.emit(result);
    // });
  }

  toTag(tag: Tag) {
    this.editTag(tag);
  }

  ngOnInit() {
  }

}
