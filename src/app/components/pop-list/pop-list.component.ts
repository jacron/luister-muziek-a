import { Component, OnInit } from '@angular/core';
import {Album} from '../../classes/Album';
import {MusicService} from '../../services/music.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pop-list',
  templateUrl: './pop-list.component.html',
  styleUrls: ['./pop-list.component.scss']
})
export class PopListComponent implements OnInit {
  albums: Album[];

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
  ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params) {
      this.fetchThings(params);
    }
  }

  afterGet(albums) {
    this.albums = albums;
  }

  fetchThings(params) {
    this.albums = [];
    this.musicService.getPerformerAlbums(params.id).subscribe(
      (albums: Album[]) => this.afterGet(albums),
      err => console.error(err),
      () => {}
    );
  }

  ngOnInit() {
  }

}
