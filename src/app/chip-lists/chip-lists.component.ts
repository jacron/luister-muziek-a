import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {Person} from '../classes/Person';
import {Tag} from '../classes/Tag';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {DialogPicComponent} from '../dialog-pic/dialog-pic.component';
import {MatDialog} from '@angular/material';
import {MusicService} from '../music.service';

@Component({
  selector: 'app-chip-lists',
  templateUrl: './chip-lists.component.html',
  styleUrls: ['./chip-lists.component.scss']
})
export class ChipListsComponent implements OnInit {

  @Input('album') album: Album;
  @Input('removable') removable: boolean;
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
    this.router.navigate(['/search',
      {
        idcomp: -1,
        idperf: -1,
        idcoll: -1,
        idtag: tag.ID
      }
    ]).then(() => {
    });
  }

  ngOnInit() {
  }

}
