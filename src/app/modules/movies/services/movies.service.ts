import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Suggestion} from '../../../classes/movies/Suggestion';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  requestUrl = environment.moviesServer + '/api';

  constructor(
    private http: HttpClient
  ) { }

  /* GET */
  getJson(cmd) {
    return this.http.get(this.requestUrl + cmd, {
      responseType: 'json'});
  }

  searchMovies(query): Observable<Suggestion[]> {
    return this.getJson('/search/movie/' + query)
      .pipe(map(
        response => response['options']));
  }

  getMovie(id) {
    return this.getJson('/film/' + id);
  }

  getMovieByImdbId(id) {
    return this.getJson('/imdb/movie/' + id);
  }

  getNewMovie(imdb_id) {
    return this.getJson('/film/new/' + imdb_id);
  }

  searchSpelers(query) {
    return this.getJson('/search/speler/' + query);
  }

  searchDirectors(query) {
    return this.getJson('/search/director/' + query)
      .pipe(map(response => response['options']));
  }

  getSpelerMovies(id) {
    return this.getJson('/speler/' + id);
  }

  getSpelerNaamMovies(naam) {
    return this.getJson('/speler/naam/' + naam);
  }

  getJaarMovies(jaar) {
    return this.getJson('/films/jaar/' + jaar + '/1');
  }

  getDirectorMovies(id) {
    return this.getJson('/director/' + id);
  }

  getRecentlyPlayedMovies(pageNr, n) {
    return this.getJson('/films/filter/recentlyplayed/' + pageNr + '/' + n)
      .pipe(map(response => response['films']));
  }

  getRecentlySeenMovies(pageNr, n) {
    return this.getJson('/films/filter/recentlyseen/' + pageNr + '/' + n)
      .pipe(map(response => response['films']));
  }

  getRecentlyAcquiredMovies(pageNr, n) {
    return this.getJson('/films/filter/recentlymade/' + pageNr + '/' + n)
      .pipe(map(response => response['films']));
  }

  play(id, player) {
    return this.getJson('/film/play/' + id + '/' + player);
  }

  openFinder(id) {
    return this.getJson('/film/folder/' + id);
  }

  addToday(id) {
    return this.getJson('/film/add/today/' + id);
  }

  /* POST */
  postForm(cmd, params) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl + cmd, params, { headers: headers},
    );
  }

  addDirectorImage(imdb_id) {
    return this.postForm('/director/image/add', { imdb_id });
  }

  addImage(imdb_id) {
    return this.postForm('/image/add', { imdb_id });
  }

  pasteImage(imdb_id) {
    return this.postForm('/image/paste', { imdb_id });
  }

  unwatch(id) {
    return this.postForm('/film/unwatch', { id });
  }

  saveNew(imdb_id) {
    return this.postForm('/film/save/imdb', { imdb_id} );
  }


}
