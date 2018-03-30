import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {environment} from '../../environments/environment';
import {Person} from '../classes/Person';
import {MusicService} from '../music.service';
import {MatDialog} from '@angular/material';
import {DialogPicComponent} from '../dialog-pic/dialog-pic.component';
import {Router} from '@angular/router';
import {Tag} from '../classes/Tag';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, AfterViewInit {
  imgUrl = environment.apiServer + '/image/';
  imgBackUrl = environment.apiServer + '/imageback/';
  @Input('album') album: Album;
  removable = true;
  chevron = 'keyboard_arrow_down';
  objectKeys = Object.keys;

  constructor(
    private musicService: MusicService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  openPic(mode): void {
    const imgUrl = this.imgUrl + this.album.ID + '/album';
    const backUrl = this.album.album_back_image ? this.imgBackUrl + this.album.ID + '/album' : null;
    this.dialog.open(DialogPicComponent, {
      width: '80%',
      data: {
        imgUrl: imgUrl,
        backUrl: backUrl,
        mode: mode
      }
    });
  }

  toComposer(composer: Person) {
    this.router.navigate(['/search',
      {
        idcomp: composer.ID,
        idperf: -1,
        idcoll: -1
      }
    ]).then(() => {
    });

  }

  toPerformer(performer: Person) {
    this.router.navigate(['/search',
      {
        idcomp: -1,
        idperf: performer.ID,
        idcoll: -1
      }
    ]).then(() => {
    });
  }

  updateAlbumTitle(id, title) {
    this.musicService.updateAlbumTitle(id, title).subscribe(
      (msg) => console.log(msg)
    );
  }

  albumTitleKeydown(e, id, title) {
    console.log(id, title);
    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateAlbumTitle(id, title);
    }
    if (e.key === 'Tab') {
      this.updateAlbumTitle(id, title);
    }
  }

  toTag(tag: Tag) {
    // todo: search getting tag option
  }

  openAddComposer() {

  }

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
    this.removeItem(this.album.album_performers, performer.ID)
  }

  removeTag(tag: Tag) {
    this.removeItem(this.album.album_tags, tag.ID);
  }

  openFinder(id) {
    this.musicService.openFinder(id).subscribe(
      (response) => console.log(response)
    );
  }

  restorePieces(album: Album) {
    console.log(album);
    this.album.pieces = album.pieces;
    this.album.cuesheets = album.cuesheets;
  }

  tagedit() {
    this.musicService.tagEditor(this.album.Path).subscribe();
  }

  pause() {
    this.musicService.controlPlayer('pause').subscribe();
  }

  refetch(albumId) {
    this.musicService.refetch(albumId).subscribe(
      (response: Album) => this.restorePieces(response)
    );
  }

  toggle() {
    this.album.expanded = !this.album.expanded;
    this.chevron = this.album.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  ngAfterViewInit() {
    // console.log(this.album);
  }

  ngOnInit() {
  }

}

