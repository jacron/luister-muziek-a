import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {Director} from '../../../../classes/Director';
import {Movie} from '../../../../classes/Movie';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  director: Director;
  movies: Movie[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGet(results) {
    // console.log(response);
    this.director = results.director;
    this.movies = results.films;
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
