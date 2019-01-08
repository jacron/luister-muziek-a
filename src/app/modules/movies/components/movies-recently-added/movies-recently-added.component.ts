import { Component, OnInit } from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movies-recently-added',
  templateUrl: './movies-recently-added.component.html',
  styleUrls: ['./movies-recently-added.component.scss']
})
export class MoviesRecentlyAddedComponent implements OnInit {
  movies: Movie[];

  constructor(
    private moviesService: MoviesService,
  ) { }

  getMovies() {
    this.moviesService.getRecentlyAcquiredMovies(10).subscribe(
      (films: Movie[]) => this.movies = films
    )
  }
  ngOnInit() {
    this.getMovies();
  }

}
