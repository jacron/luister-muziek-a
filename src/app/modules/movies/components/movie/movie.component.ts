import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';
import {StoreService} from '../../../../services/store.service';
import {StorageService} from '../../../../services/storage.service';
import {StateService} from '../../../../services/state.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: Movie;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGet(response) {
    this.movie = response.film;
    this.stateService.setTitle(this.movie.Titel);
    document.title = this.movie.Titel;
  }

  handleParams(params) {
    if (params) {
      if (params.idmovie) {
        this.moviesService.getMovie(params.idmovie).subscribe(
          response => this.afterGet(response)
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
