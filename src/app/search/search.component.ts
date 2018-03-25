import {Component, OnInit} from '@angular/core';
import {MusicService} from '../music.service';
import {Albums} from '../classes/Albums';
import {Person} from '../classes/Person';
import {Album} from '../classes/Album';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  albumsContainer: Albums;
  albums: Album[];

  composers: Person[];
  performers: Person[];
  selectedComposerId = -1;
  selectedPerformerId = -1;
  selectedAlbum: Album;

  // albumUrl = 'http://127.0.0.1:8010/album/';

  constructor(private musicService: MusicService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params) {
      console.log(params);
      this.albums = [];
      this.musicService.getAlbumsComponist(params.idc).subscribe(
        (albums: Albums) => this.albumsContainer = albums,
        err => console.error(err),
        () => console.log('componist albums fetched')
      );
    } else {
      this.albumsContainer = new Albums();
    }
  }

  getAlbumsComponist() {
    this.router.navigate(['/search',
      {
        idc: this.selectedComposerId,
        idp: this.selectedPerformerId
      }
    ]).then();
  }

  getAlbum(album) {
    this.router.navigate(['/album', album.ID]).then();
  }

  getAlbumAlbums(album) {
    this.musicService.getAlbumAlbums(album.ID).subscribe(
      (albums: Album[]) => {
        this.albums = albums;
        this.albumsContainer = new Albums();
        this.selectedAlbum = album;
      },
      err => console.error(err),
      () => console.log('album albums fetched')
    );
  }

  getComposers() {
    this.musicService.getComposers().subscribe(
      (people: Person[]) => {
        this.composers = people;
        console.log(people);
        // this.selectedComposerId = 1;
        // setTimeout(() => { this.selectedComposerId = '1'; console.log('init'); }, 3000);
      },
      err => console.error(err),
      () => console.log('componisten fetched')
    );
  }

  getPerformers() {
    this.musicService.getPerformers().subscribe(
      (people: Person[]) => {
        this.performers = people;
      },
      err => console.error(err),
      () => console.log('performers fetched')
    );
  }

  ngOnInit() {
    this.albumsContainer = new Albums();
    this.getComposers();
    this.getPerformers();
    this.selectedComposerId = 1; // D. Scarlatti
    this.selectedPerformerId = null;
  }

}
