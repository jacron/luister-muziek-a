import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {Person} from '../classes/Person';
import {Tag} from '../classes/Tag';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-chip-lists',
  templateUrl: './chip-lists.component.html',
  styleUrls: ['./chip-lists.component.scss']
})
export class ChipListsComponent implements OnInit {

  @Input('album') album: Album;
  removable = true;
  imgUrl = environment.apiServer + '/image/';

  constructor(    private router: Router,
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
