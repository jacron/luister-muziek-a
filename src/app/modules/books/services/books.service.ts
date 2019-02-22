import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  // getBooks() {
  //   return this.getJson('/api/books');
  // }

  searchAuthors(query) {
    return this.getJson('/api/search/authors/' + query);
  }

  searchTitles(query) {
    return this.getJson('/api/search/books/' + query);
  }

  getAuthorBooks(authorId) {
    return this.getJson('/api/author/books/' + authorId);
  }

  getBook(bookId) {
    return this.getJson('/api/book/' + bookId);
  }

  /* POST */
  postForm(cmd, params) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl + cmd, params, { headers: headers},
    );
  }

  scanCover(bookId) {
    return this.postForm('/api/book/scan/' + bookId, {});
  }

}
