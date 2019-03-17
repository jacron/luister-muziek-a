import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Director} from '../../../../classes/movies/Director';
import {MoviesService} from '../../services/movies.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-director-films-list',
  templateUrl: './director-films-list.component.html',
  styleUrls: ['./director-films-list.component.scss']
})
export class DirectorFilmsListComponent implements OnInit {
  @Input() director: Director;
  @Output() close = new EventEmitter();

  films = null;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
  ) { }

  filmsCountLabel(n) {
    return n === 1 ? 'film' : 'films';
  }

  toFilm(id) {
    this.router.navigate(['movies', id]).then(
      () => this.close.emit('navigated')
    )
  }

  afterFetchFilms(result) {
    this.films = result.films;
  }

  fetchFilms() {
    this.moviesService.getDirectorMovies(this.director.id).subscribe(
      result => this.afterFetchFilms(result)
    )
  }

  ngOnInit() {
    this.fetchFilms();
  }

}
