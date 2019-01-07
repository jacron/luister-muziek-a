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

  getDirectors() {
    return this.getJson('/api/director');
  }

  getDirectorMovies(id) {
    return this.getJson('/api/director/' + id);
  }

  getRecentlyPlayedMovies() {
    return this.getJson('/api/films/filter/LaatstAfgespeeld/1')
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

}
