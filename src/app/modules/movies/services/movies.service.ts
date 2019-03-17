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

  /*
    get films
   */
  getMovie(id) {
    return this.getJson('/films/' + id);
  }

  searchMovies(query): Observable<Suggestion[]> {
    return this.getJson('/search/movie/' + query)
      .pipe(map(
        response => response['options']));
  }

  getJaarMovies(jaar) {
    return this.getJson('/films/jaar/' + jaar + '/1');
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

  getNewMovie(imdb_id) {
    return this.getJson('/films/new/' + imdb_id);
  }

  play(id, player) {
    return this.getJson(`/films/${id}/play/${player}`);
  }

  openFinder(id) {
    return this.getJson(`/films/${id}/folder`);
  }

  addToday(id) {
    return this.getJson(`/films/${id}/add/today/`);
  }

  /*
    get directors
   */
  getDirectors() {
    return this.getJson('/directors');
  }

  getDirectorMovies(id) {
    return this.getJson('/directors/' + id);
  }



  getMovieByImdbId(id) {
    return this.getJson('/imdb/movie/' + id);
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

  pasteDirectorPicture(id, url) {
    return this.postForm(`/directors/${id}/image/paste`, { url });
  }

  pasteDirectorClipboardImage(id) {
    return this.postForm(`/directors/${id}/image/clipboard/paste`, {});
  }

  saveDirector(director) {
    return this.postForm(`/directors/save`, {director});
  }

  removeDirector(id) {
    return this.postForm(`/directors/${id}/delete`, {});
  }

  unwatch(id) {
    return this.postForm('/film/unwatch', { id });
  }

  saveNew(imdb_id) {
    return this.postForm('/film/save/imdb', { imdb_id} );
  }

  storeWikiDirectorImage(url, id) {
    return this.postForm(`/directors/${id}/wiki`, {
      url
    });
  }


}
