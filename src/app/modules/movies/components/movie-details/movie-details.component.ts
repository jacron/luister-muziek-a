import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {MovieDetails} from '../../../../classes/movies/MovieDetails';
import {Speler} from '../../../../classes/movies/Speler';
import {Gezien} from '../../../../classes/movies/Gezien';
import {environment} from '../../../../../environments/environment';
import {MoviesService} from '../../services/movies.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnChanges {
  @Input() details: MovieDetails;
  movie: Movie;
  spelers: Speler[] = [];
  actors: any[];
  gezien: Gezien[];
  finderOpened = false;

  constructor(
    private moviesService: MoviesService,
    private domSanatizer: DomSanitizer,
  ) { }

  toFinder() {
    this.moviesService.openFinder(this.movie.ID).subscribe(
      () => this.finderOpened = true
    );
  }

  toImdb() {
    window.open(environment.imdbTitle + this.movie.imdb_id);
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.details) {
      if (this.details) {
        console.log(this.details);
        this.movie = this.details.film;
        this.gezien = this.details.gezien;
        this.actors = this.details.spelers;
        const spelers = this.movie.Spelers.split(',');
        spelers.forEach(speler => this.spelers.push({naam: speler, ID: -1}));
      }
    }
  }

  ngOnInit() {
  }

}
