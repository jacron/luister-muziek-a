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
  requestUrl = environment.moviesServer;

  constructor(
    private http: HttpClient
  ) { }

  /* GET */
  getJson(cmd) {
    return this.http.get(this.requestUrl + cmd, {
      responseType: 'json'});
  }

  searchMovies(query): Observable<Suggestion[]> {
    return this.getJson('/api/search/movie/' + query)
      .pipe(map(
        response => response['options']));
  }

  getMovie(id) {
    return this.getJson('/api/film/' + id);
  }

  refetchMovie(imdb_id) {
    return this.getJson('/api/film/new/' + imdb_id);
  }

  searchSpelers(query) {
    return this.getJson('/api/search/speler/' + query);
  }

  searchDirectors(query) {
    return this.getJson('/api/search/director/' + query)
      .pipe(map(response => response['options']));
  }

  getSpelerMovies(id) {
    return this.getJson('/api/speler/' + id);
  }

  getSpelerNaamMovies(naam) {
    return this.getJson('/api/speler/naam/' + naam);
  }

  getJaarMovies(jaar) {
    return this.getJson('/api/films/jaar/' + jaar + '/1');
  }

  getDirectorMovies(id) {
    return this.getJson('/api/director/' + id);
  }

  getRecentlyPlayedMovies(pageNr, n) {
    return this.getJson('/api/films/filter/recentlyplayed/' + pageNr + '/' + n)
      .pipe(map(response => response['films']));
  }

  getRecentlySeenMovies(pageNr, n) {
    return this.getJson('/api/films/filter/recentlyseen/' + pageNr + '/' + n)
      .pipe(map(response => response['films']));
  }

  getRecentlyAcquiredMovies(pageNr, n) {
    return this.getJson('/api/films/filter/recentlymade/' + pageNr + '/' + n)
      .pipe(map(response => response['films']));
  }

  play(id) {
    return this.getJson('/api/film/play/' + id);
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
    return this.postForm('/api/director/image/add', { imdb_id });
  }

  addImage(imdb_id) {
    return this.postForm('/api/image/add', { imdb_id });
  }

  unwatch(id) {
    return this.postForm('/api/film/unwatch', { id });
  }

}
