import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {Person} from '../classes/Person';
import {Tag} from '../classes/Tag';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {DialogPicComponent} from '../dialog-pic/dialog-pic.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-chip-lists',
  templateUrl: './chip-lists.component.html',
  styleUrls: ['./chip-lists.component.scss']
})
export class ChipListsComponent implements OnInit {

  @Input('album') album: Album;
  removable = false;
  imgUrl = environment.apiServer + '/image/';

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) { }

  removeItem(persons, id) {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].ID === id) {
        // todo: remove link to person from album
        persons.splice(i, 1);
      }
    }
  }

  removeComposer(composer: Person) {
    this.removeItem(this.album.album_componisten, composer.ID);
  }

  removePerformer(performer: Person) {
    this.removeItem(this.album.album_performers, performer.ID);
  }

  removeTag(tag: Tag) {
    this.removeItem(this.album.album_tags, tag.ID);
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

  openAddComposer() {

  }

  toComposer(composer: Person) {
    this.router.navigate(['/search',
      {
        idcomp: composer.ID,
        idperf: -1,
        idcoll: -1,
        idtag: -1
      }
    ]).then(() => {
    });
  }

  toPerformer(performer: Person) {
    this.router.navigate(['/search',
      {
        idcomp: -1,
        idperf: performer.ID,
        idcoll: -1,
        idtag: -1
      }
    ]).then(() => {
    });
  }

  toTag(tag: Tag) {
    // todo: search getting tag option
  }

  ngOnInit() {
  }

}
