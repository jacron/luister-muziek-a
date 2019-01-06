import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {Director} from '../../../../classes/movies/Director';
import {Movie} from '../../../../classes/movies/Movie';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  director: Director;
  movies: Movie[];
  filteredMovies: Movie[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGet(results) {
    this.director = results.director;
    this.movies = this.filteredMovies = results.films;
  }

  filterTitle(query) {
    if (!query || !query.length) {
      this.filteredMovies = this.movies.slice();
      return;
    }
    const q = query.toLowerCase();
    this.filteredMovies = this.movies.filter(
      (movie: Movie) => movie.Titel.toLowerCase().indexOf(q) != -1
    );
  }

  handleParams(params) {
    if (params) {
      if (params.iddirector) {
        this.moviesService.getDirectorMovies(params.iddirector).subscribe(
          results => this.afterGet(results)
        );
      }
    }
  }

  ngOnInit() {
  }

}
