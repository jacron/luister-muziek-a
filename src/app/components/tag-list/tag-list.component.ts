import { Component, OnInit } from '@angular/core';
import {Album} from '../../classes/Album';
import {MusicService} from '../../services/music.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

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
    this.musicService.getTagAlbums(params.id).subscribe(
      (albums: Album[]) => this.afterGet(albums),
      err => console.error(err),
      () => {}
    );
  }
  ngOnInit() {
  }

}
