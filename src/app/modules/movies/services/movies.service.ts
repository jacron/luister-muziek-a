import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {SearchParams} from '../../../classes/SearchParams';

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

  getMovie(id) {
    return this.getJson('/api/film/' + id);
  }

  getDirectors() {
    return this.getJson('/api/director');
  }

  getDirectorMovies(id) {
    return this.getJson('/api/director/' + id);
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

  // addSearchToHistory(title: string, params: SearchParams) {
  //   return this.postForm('/search/history', {
  //     title,
  //     params
  //   });
  // }

}
