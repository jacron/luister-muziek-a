import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';
import {StateService} from '../../../../services/state.service';
import {environment} from '../../../../../environments/environment';
import {Speler} from '../../../../classes/movies/Speler';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: Movie;
  spelers: Speler[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  toImdb() {
    window.open(environment.imdbTitle + this.movie.imdb_id);
  }

  afterGetMovie(response) {
    this.movie = response.film;
    this.stateService.setTitle(this.movie.Titel);
    document.title = this.movie.Titel;
    const spelers = this.movie.Spelers.split(',');
    spelers.forEach(speler => this.spelers.push({naam: speler, ID: -1}));
  }

  handleParams(params) {
    if (params) {
      if (params.idmovie) {
        this.moviesService.getMovie(params.idmovie).subscribe(
          response => this.afterGetMovie(response)
        );
      }
    }
  }

  play() {
    this.moviesService.play(this.movie.ID).subscribe();
  }

  ngOnInit() {
  }

}
