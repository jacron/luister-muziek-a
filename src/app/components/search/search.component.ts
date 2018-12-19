import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Album} from '../../classes/Album';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchParams} from '../../classes/SearchParams';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  albums: Album[];
  params: SearchParams;

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    route.params.subscribe(params => this.handleParams(<SearchParams>params));
  }

  handleParams(params: SearchParams) {
    if (params) {
      this.fetchThings(params);
      this.params = params;
    }
  }

  fetchThings(params) {
    this.albums = [];
    this.musicService.getSearchedAlbums(params).subscribe(
      (albums: Album[]) => {
        this.albums = albums;
      },
      err => console.error(err),
      () => {}
    );
  }

  getAlbums(params: SearchParams) {
    this.router.navigate(['/search', params])
      .then(() => {
    });
  }

  ngOnInit() {
  }

}
