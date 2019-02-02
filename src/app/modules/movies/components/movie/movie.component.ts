import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Gezien, Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';
import {StateService} from '../../../../services/state.service';
import {environment} from '../../../../../environments/environment';
import {Speler} from '../../../../classes/movies/Speler';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: Movie;
  spelers: Speler[] = [];
  actors;
  gezien: Gezien;
  finderOpened = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private stateService: StateService,
    private domSanatizer: DomSanitizer,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  toImdb() {
    window.open(environment.imdbTitle + this.movie.imdb_id);
  }

  afterGetMovie(response) {
    this.movie = response.film;
    // console.log(response);
    this.gezien = response.gezien;
    this.actors = response.spelers;
    this.stateService.setTitle(this.movie.Titel);
    document.title = this.movie.Titel;
    const spelers = this.movie.Spelers.split(',');
    spelers.forEach(speler => this.spelers.push({naam: speler, ID: -1}));
  }

  toFinder() {
    this.moviesService.openFinder(this.movie.ID).subscribe(
      () => this.finderOpened = true
    );
  }

  handleParams(params) {
    if (params) {
      if (params.idmovie) {
        this.moviesService.getMovie(params.idmovie).subscribe(
          response => this.afterGetMovie(response)
        );
      }
    }
  }

  getImageUrl(imageUrl) {
    if (imageUrl) {
      return this.domSanatizer.bypassSecurityTrustResourceUrl(imageUrl);
    } else {
      return 'assets/not-found.png';
    }
  }

  afterAddToday(response) {
    console.log(response);
    this.gezien = response.datums;
  }

  addToday() {
    this.moviesService.addToday(this.movie.ID).subscribe(
      response => this.afterAddToday(response)
    )
  }

  afterRefetch(results) {
    if (results.movie) {
      // console.log(results.movie);
      this.actors = results.movie.actor_array;
    }
  }

  refetch() {
    this.moviesService.getNewMovie(this.movie.imdb_id).subscribe(
      response => this.afterRefetch(response)
    );
  }

  afterPlay(response) {
    console.log(response);
    if (response.status !== 200) {
      alert(response.message);
    }
  }

  play(player) {
    this.moviesService.play(this.movie.ID, player).subscribe(
      response => this.afterPlay(response)
    );
  }

  ngOnInit() {
  }

}
