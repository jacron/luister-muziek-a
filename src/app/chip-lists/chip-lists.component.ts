import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {Person} from '../classes/Person';
import {Tag} from '../classes/Tag';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {DialogPicComponent} from '../dialog-pic/dialog-pic.component';
import {MatDialog} from '@angular/material';
import {MusicService} from '../music.service';
import {DialogPersonComponent} from '../dialog-person/dialog-person.component';
import {DialogTagComponent} from '../dialog-tag/dialog-tag.component';

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
      (response) => items.splice(index, 1)
    );
  }

  removePerformer(performer: Person) {
    const items = this.album.album_performers;
    const index = this.getItemIndex(items, performer.ID);
    this.musicService.removePerformer(performer.ID, this.album.ID).subscribe(
      (response) => items.splice(index, 1)
  );
  }

  removeTag(tag: Tag) {
    const items = this.album.album_tags;
    const index = this.getItemIndex(items, tag.ID);
    this.musicService.removeTag(tag.ID, this.album.ID).subscribe(
      (response) => items.splice(index, 1)
    );
  }

  openPicDialog(imgUrl) {
    this.dialog.open(DialogPicComponent, {
      width: '80%',
      data: {
        imgUrl: imgUrl,
      }
    });
  }

  openPicComposer(id): void {
    this.openPicDialog(this.imgUrl + id + '/componist');
  }

  openPicPerformer(id): void {
    this.openPicDialog(this.imgUrl + id + '/performer');
  }

  editPerson(person: Person, type: string) {
    this.dialog.open(DialogPersonComponent, {
      width: '50%',
      data: {
        person: person,
        type: type
      }
    });
  }

  goToComposer(idComp) {
    this.router.navigate(['/search',
      {
        idcomp: idComp,
        idperf: -1,
        idcoll: -1,
        idtag: -1
      }
    ]).then(() => {
    });
  }

  toComposer(composer: Person) {
    if (this.editable) {
      this.editPerson(composer, 'componist');
    } else {
      this.goToComposer(composer.ID);
    }
  }

  goToPerformer(idPerf) {
    this.router.navigate(['/search',
      {
        idcomp: -1,
        idperf: idPerf,
        idcoll: -1,
        idtag: -1
      }
    ]).then(() => {
    });
  }
  toPerformer(performer: Person) {
    if (this.editable) {
      this.editPerson(performer, 'performer');
    } else {
      this.goToPerformer(performer.ID);
    }
  }

  editTag(tag: Tag) {
    this.dialog.open(DialogTagComponent, {
      width: '50%',
      data: {
        tag: tag
      }
    });
  }

  goToTag(idTag) {
    this.router.navigate(['/search',
      {
        idcomp: -1,
        idperf: -1,
        idcoll: -1,
        idtag: idTag
      }
    ]).then(() => {
    });
  }

  toTag(tag: Tag) {
    if (this.editable) {
      this.editTag(tag);
    } else {
      this.goToTag(tag.ID);
    }
  }

  ngOnInit() {
  }

}
