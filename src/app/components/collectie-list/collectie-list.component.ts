import { Component, OnInit } from '@angular/core';
import {Album} from '../../classes/Album';
import {MusicService} from '../../services/music.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-collectie-list',
  templateUrl: './collectie-list.component.html',
  styleUrls: ['./collectie-list.component.scss']
})
export class CollectieListComponent implements OnInit {

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

  fetchThings(params) {
    this.albums = [];
    this.musicService.getCollectionAlbums(params.id).subscribe(
      (albums: Album[]) => {
        this.albums = albums;
      },
      err => console.error(err),
      () => {}
    );
  }
  ngOnInit() {
  }

}
