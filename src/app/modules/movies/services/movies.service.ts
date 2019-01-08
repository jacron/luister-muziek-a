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

  getSpelers() {
    return this.getJson('/api/speler');
  }

  getSpelerMovies(id) {
    return this.getJson('/api/speler/' + id);
  }

  getDirectors() {
    return this.getJson('/api/director');
  }

  getDirectorMovies(id) {
    return this.getJson('/api/director/' + id);
  }

  getRecentlyPlayedMovies(n) {
    return this.getJson('/api/films/filter/recentlyplayed/1/' + n)
      .pipe(map(response => response['films']));
  }

  getRecentlySeenMovies(n) {
    return this.getJson('/api/films/filter/recentlyseen/1/' + n)
      .pipe(map(response => response['films']));
  }

  getRecentlyAcquiredMovies(n) {
    return this.getJson('/api/films/filter/recentlymade/1/' + n)
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

  addImage(imdb_id) {
    return this.postForm('/api/image/add', { imdb_id });
  }

}
