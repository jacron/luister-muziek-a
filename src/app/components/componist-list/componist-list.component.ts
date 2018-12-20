import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Album} from '../../classes/Album';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-componist-list',
  templateUrl: './componist-list.component.html',
  styleUrls: ['./componist-list.component.scss']
})
export class ComponistListComponent implements OnInit {
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
    this.musicService.getComposerAlbums(params.id).subscribe(
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
