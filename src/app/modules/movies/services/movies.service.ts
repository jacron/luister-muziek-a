import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

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
}
