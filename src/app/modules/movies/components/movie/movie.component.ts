import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';

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
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGet(response) {
    // console.log(response);
    this.movie = response.film;
  }

  handleParams(params) {
    // console.log(params);
    if (params) {
      if (params.idmovie) {
        console.log(params.idmovie);
        this.moviesService.getMovie(params.idmovie).subscribe(
          response => this.afterGet(response)
        );
      }
    }
  }

  ngOnInit() {
  }

}
