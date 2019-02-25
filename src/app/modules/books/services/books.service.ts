import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../../../classes/book/book';
import {Author} from '../../../classes/book/author';
import {RemoteService} from './remote.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  requestUrl = environment.booksServer;

  constructor(
    private http: HttpClient,
    private remoteService: RemoteService,
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

  searchTitlesFull(query) {
    return this.getJson('/api/search/books/full/' + query);
  }

  getAuthorBooks(authorId) {
    return this.getJson('/api/author/books/' + authorId);
  }

  getBook(bookId) {
    return this.getJson('/api/book/' + bookId);
  }

  getBookByIsbn(isbn) {
    return this.getJson('/api/book/isbn/' + isbn);
  }

  getRemote(isbn, source) {
    if (source === 'bolcom') {
      return this.getJson('/api/book/remote/' + isbn + '/' + source);
    } else {
      return this.remoteService.getRemote(isbn, source);
    }
  }

  getBolcomCover(isbn) {
    return this.getJson('/api/book/getbolcomcover/' + isbn);
  }

  getAuthors() {
    return this.getJson('/api/authors/shallow');
  }

  /* POST */
  postForm(cmd, params) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl + cmd, params, { headers: headers},
    );
  }

  scanCover() {
    return this.postForm('/api/book/scan', {});
  }

  finishCover(bookId) {
    return this.postForm('/api/book/scanfinish/' + bookId, {});
  }

  getCover(bookId) {
    return this.postForm('/api/book/getcover/' + bookId, {});
  }

  getPicture(authorId) {
    return this.postForm('/api/author/getpicture/' + authorId, {});
  }

  removeBook(bookId) {
    return this.postForm('/api/book/remove/' + bookId, {});
  }

  removeAuthor(authorId) {
    return this.postForm('/api/author/remove/' + authorId, {});
  }

  saveBook(book: Book) {
    return this.postForm('/api/book/save', {book});
  }

  saveAuthor(author: Author) {
    return this.postForm('/api/author/save', {author});
  }
}
