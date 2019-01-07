import { Component, OnInit } from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movies-recently-played',
  templateUrl: './movies-recently-played.component.html',
  styleUrls: ['./movies-recently-played.component.scss']
})
export class MoviesRecentlyPlayedComponent implements OnInit {
  movies: Movie[];

  constructor(
    private moviesService: MoviesService,
  ) { }

  getMovies() {
    this.moviesService.getRecentlyPlayedMovies().subscribe(
      (films: Movie[]) => this.movies = films
    )
  }
  ngOnInit() {
    this.getMovies();
  }

}
