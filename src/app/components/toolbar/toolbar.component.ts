import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Album} from '../../classes/Album';
import {MusicService} from '../../services/music.service';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage.service';
import {MatMenuTrigger} from '@angular/material';
import {List} from '../../classes/List';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input() album: Album;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  list: List;
  navForwards: boolean;
  navBackwards: boolean;
  navForwardsCount: number;
  navBackwardsCount: number;
  constructor(
    private musicService: MusicService,
    private router: Router,
    private storageService: StorageService,
    private util: UtilService,
  ) { }

  ngOnChanges(changes) {
    this.enableNavig(this.list);
  }

  albumTitleKeydown(e, id, title) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateAlbumTitle(id, title);
    }
    if (e.key === 'Tab') {
      this.updateAlbumTitle(id, title);
    }
  }

  albumDescriptionKeydown(e, id, title) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateAlbumDescription(id, title);
    }
    if (e.key === 'Tab') {
      this.updateAlbumDescription(id, title);
    }
  }

  updateAlbumTitle(id, title) {
    this.musicService.updateAlbumTitle(id, title).subscribe(
      (msg) => console.log(msg)
    );
  }

  updateAlbumDescription(id, title) {
    this.musicService.updateAlbumDescription(id, title).subscribe(
      (msg) => console.log(msg)
    );
  }

  toCollection() {
    this.router.navigate(['/search',
      {
        idcoll: this.album.mother.ID,
      }
    ]).then(() => {
    });
  }

  toList() {
    const sParams = this.util.cloneObject(this.list.params);
    sParams.search = this.list.query || '';
    this.router.navigate([
      this.list.url,
      sParams
    ]).then(() => {
    });
  }

  back() {
    const albumIds = this.list.albumIds;
    for (let i = 1; i < albumIds.length; i++) {
      if (albumIds[i] === +this.album.ID) {
        this.router.navigate(['/album',
          albumIds[i - 1]]).then();
      }
    }
  }

  forward() {
    const albumIds = this.list.albumIds;
    for (let i = 0; i < albumIds.length - 1; i++) {
      if (albumIds[i] === +this.album.ID) {
        this.router.navigate(['/album',
          albumIds[i + 1]]).then();
      }
    }
  }

  enableNavig(list: List) {
    if (!list) {
      this.navBackwards = this.navForwards = false;
      return;
    }
    const albumIds = list.albumIds;
    if (!albumIds || !Array.isArray(albumIds) || albumIds.length === 0) {
      this.navBackwards = this.navForwards = false;
      return;
    }
    this.navBackwards = this.navForwards = true;

    for (let i = 0; i < albumIds.length; i++) {
      if (albumIds[i] === +this.album.ID) {
        if (i === 0) {
          this.navBackwards = false;
        }
        this.navBackwardsCount = i;
        this.navForwardsCount = albumIds.length - i - 1;
        if (i === albumIds.length - 1) {
          this.navForwards = false;
        }
        break;
      }
    }
  }

  ngOnInit() {
    this.list = this.storageService.retrieveList();
    // console.log(this.list);
    this.enableNavig(this.list);
  }

}
