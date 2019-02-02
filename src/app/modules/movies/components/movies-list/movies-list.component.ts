import {Component, Input, OnChanges, OnInit, SimpleChanges,} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {Router} from '@angular/router';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnChanges {
  @Input() movies: Movie[];
  @Input() hideDirector: boolean;
  @Input() unwatch: boolean;
  @Input() wrap: string;
  @Input() more: string;
  query;
  filteredMovies: Movie[];

  constructor(
    private router: Router,
    private moviesService: MoviesService,
  ) { }

  afterUnwatch(result, id) {
    if (result.status && result.status === 200) {
      const movie = this.movies.find(amovie => amovie.ID == id);
      this.movies.splice(this.movies.indexOf(movie), 1);
    }
  }

  toDetails(id) {
    this.router.navigate(['/movies', id]).then();
  }

  toMore() {
    this.router.navigateByUrl(this.more).then();
  }

  unwatchChange(id) {
    this.moviesService.unwatch(id).subscribe(result =>
      this.afterUnwatch(result, id));
  }

  filterTitle(query) {
    if (!query || !query.length) {
      this.filteredMovies = this.movies.slice();
    } else {
      const q = query.toLowerCase();
      this.filteredMovies = this.movies.filter(
        (movie: Movie) => movie.Titel.toLowerCase().indexOf(q) !== -1
      );
    }
  }

  resetSearch() {
    this.query = null;
    this.filterTitle(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.movies && this.movies) {
      this.filteredMovies = this.movies.slice();
    }
  }

  ngOnInit() {
  }

}
