import { Component, OnInit } from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {StateService} from '../../../../services/state.service';
import {Speler} from '../../../../classes/movies/Speler';

@Component({
  selector: 'app-speler',
  templateUrl: './speler.component.html',
  styleUrls: ['./speler.component.scss']
})
export class SpelerComponent implements OnInit {
  speler: Speler;
  movies: Movie[];
  filteredMovies: Movie[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGetSpeler(results) {
    this.speler = results.speler;
    this.movies = this.filteredMovies = results.films;
    this.stateService.setTitle(this.speler.naam);
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

  handleParams(params) {
    if (params) {
      if (params.idspeler) {
        this.moviesService.getSpelerMovies(params.idspeler).subscribe(
          results => this.afterGetSpeler(results)
        );
      }
      if (params.naamspeler) {
        this.moviesService.getSpelerNaamMovies(params.naamspeler).subscribe(
          results => this.afterGetSpeler(results)
        )
      }
    }
  }

  ngOnInit() {
  }

}
