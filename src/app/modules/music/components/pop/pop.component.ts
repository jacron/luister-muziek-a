import { Component, OnInit } from '@angular/core';
import {StateService} from '../../../../services/state.service';
import {Person} from '../../../../classes/music/Person';
import {MusicService} from '../../services/music.service';
import {Album} from '../../../../classes/music/Album';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {
  filteredPerformers: Person[];
  performers: Person[];
  query;

  constructor(
    private stateService: StateService,
    private musicService: MusicService,
    private router: Router,
  ) { }

  afterFetch(albums, id) {
    console.log(albums);
    if (albums.length === 1) {
      this.router.navigate(['/album', albums[0].ID]).then();
    } else {
      this.router.navigate(['/pop', id]).then();
    }
  }

  fetchThings(id) {
    console.log(id);
    this.musicService.getPerformerAlbums(id).subscribe(
      (albums: Album[]) => this.afterFetch(albums, id),
      err => console.error(err),
      () => {}
    );
  }

  toPerformer(id) {
    this.fetchThings(id);
    // [routerLink]="performer.ID"

  }
  afterGet(response) {
    // console.log(response);
    this.filteredPerformers = this.performers = response;
  }

  resetSearch() {
    this.query = null;
    this.filterTitle(null);
  }

  filterTitle(query) {
    if (!query || !query.length) {
      this.filteredPerformers = this.performers.slice();
    } else {
      const q = query.toLowerCase();
      this.filteredPerformers = this.performers.filter(
        (person: Person) => person.FullName.toLowerCase().indexOf(q) !== -1
      );
    }
  }

  ngOnInit() {
    this.stateService.setTitle('Pop');
    this.musicService.getPerformersGenre('pop')
      .subscribe(response => this.afterGet(response));
  }

}
