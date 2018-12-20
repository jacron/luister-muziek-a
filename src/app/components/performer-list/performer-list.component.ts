import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Album} from '../../classes/Album';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.scss']
})
export class PerformerListComponent implements OnInit {

  albums: Album[];

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
  ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    // console.log(params);
    if (params) {
      this.fetchThings(params);
    }
  }

  fetchThings(params) {
    this.albums = [];
    this.musicService.getPerformerAlbums(params.id).subscribe(
      (albums: Album[]) => {
        // console.log(albums);
        this.albums = albums;
      },
      err => console.error(err),
      () => {}
    );
  }

  ngOnInit() {
  }

}
