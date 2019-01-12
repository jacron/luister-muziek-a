import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {StateService} from '../../../../services/state.service';
import {Movie} from '../../../../classes/movies/Movie';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-movies-new-from-imdb',
  templateUrl: './movies-new-from-imdb.component.html',
  styleUrls: ['./movies-new-from-imdb.component.scss']
})
export class MoviesNewFromImdbComponent implements OnInit {
  tt: string;
  film;
  title;
  naamRegisseur;
  rating;
  exists = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  toImdb() {
    window.open(environment.imdbTitle + this.tt);
  }

  afterSaveNew(results) {
    console.log(results);
  }

  submit() {
    this.moviesService.saveNew(this.tt).subscribe(
      results => this.afterSaveNew(results)
    )
  }

  afterGetMovie(results) {
    console.log(results);
    if (results.item) {
      if (results.item.ID) {
        this.film = results.item;
        this.title = this.film.Titel;
        this.naamRegisseur = this.film.naamRegisseur;
        this.exists = true;
      } else {
        this.film = results.item;
        this.title = this.film.title;
        this.naamRegisseur = this.film.director.name;
        this.rating = this.film.rating;
      }
    } else {
      console.log(results);
    }
  }

  handleParams(params) {
    if (params) {
      if (params.tt) {
        this.tt = params.tt;
        console.log(this.tt);
        this.stateService.setTitle(this.tt);
        this.moviesService.getMovieByImdbId(this.tt).subscribe(
          results => this.afterGetMovie(results)
        );
      }
    }
  }

  ngOnInit() {
  }

}
