import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movies-recently-played',
  templateUrl: './movies-recently-played.component.html',
  styleUrls: ['./movies-recently-played.component.scss']
})
export class MoviesRecentlyPlayedComponent implements OnInit {
  @Input() wrap: boolean;
  @Input() more: boolean;
  @Input() count: number;

  movies: Movie[];

  constructor(
    private moviesService: MoviesService,
  ) { }

  getMovies() {
    this.moviesService.getRecentlyPlayedMovies(this.count).subscribe(
      (films: Movie[]) => this.movies = films
    )
  }
  ngOnInit() {
    if (!this.count) {
      this.count = 20;
    }
    this.getMovies();
  }

}
