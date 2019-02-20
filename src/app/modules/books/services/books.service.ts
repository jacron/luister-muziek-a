import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  requestUrl = environment.booksServer;

  constructor(
    private http: HttpClient
  ) { }

  /* GET */
  private getJson(cmd) {
    return this.http.get(this.requestUrl + cmd, {
      responseType: 'json'});
  }

  getBooks() {
    return this.getJson('/api/books');
  }

}
