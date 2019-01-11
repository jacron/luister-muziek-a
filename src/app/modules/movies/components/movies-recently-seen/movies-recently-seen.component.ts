import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movies-recently-seen',
  templateUrl: './movies-recently-seen.component.html',
  styleUrls: ['./movies-recently-seen.component.scss']
})
export class MoviesRecentlySeenComponent implements OnInit {
  @Input() wrap: boolean;
  @Input() more: boolean;
  @Input() count: number;

  movies: Movie[];

  constructor(
    private moviesService: MoviesService,
  ) { }

  getMovies() {
    this.moviesService.getRecentlySeenMovies(this.count).subscribe(
      (films: Movie[]) => this.movies = films
    )
  }
  ngOnInit() {
    this.getMovies();
  }
}
