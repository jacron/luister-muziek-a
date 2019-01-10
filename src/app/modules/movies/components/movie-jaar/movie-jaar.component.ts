import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {StateService} from '../../../../services/state.service';
import {Movie} from '../../../../classes/movies/Movie';

@Component({
  selector: 'app-movie-jaar',
  templateUrl: './movie-jaar.component.html',
  styleUrls: ['./movie-jaar.component.scss']
})
export class MovieJaarComponent implements OnInit {
  movies: Movie[];
  filteredMovies: Movie[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  filterTitle(query) {
    if (!query || !query.length) {
      this.filteredMovies = this.movies.slice();
    } else {
      const q = query.toLowerCase();
      this.filteredMovies = this.movies.filter(
        (movie: Movie) => movie.Titel.toLowerCase().indexOf(q) != -1
      );
    }
  }

  afterGetJaar(results, jaar) {
    this.stateService.setTitle(jaar);
    this.movies = this.filteredMovies = results;
  }

  handleParams(params) {
    if (params) {
      if (params.jaar) {
        this.moviesService.getJaarMovies(params.jaar).subscribe(
          results => this.afterGetJaar(results, params.jaar)
        );
      }
    }
  }

  ngOnInit() {
  }

}
