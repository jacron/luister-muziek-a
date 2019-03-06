import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../../../classes/book/book';
import {Author} from '../../../classes/book/author';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  requestUrl = environment.booksServer;

  constructor(
    private http: HttpClient,
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
    return this.getJson('/api/book/author/' + authorId);
  }

  getBook(bookId) {
    return this.getJson('/api/book/' + bookId);
  }

  getAuthor(authorId) {
    return this.getJson('/api/author/' + authorId);
  }

  getBookByIsbn(isbn) {
    return this.getJson('/api/book/isbn/' + isbn); // s added
  }

  getRemote(isbn, source) {
    return this.getJson('/api/book/remote/' + isbn + '/' + source);  // s added
  }

  getBooksCount() {
    return this.getJson('/api/book/count');
  }

  getRecent(limit) {
    return this.getJson('/api/book/recent/' + limit);
  }

  getAuthors() {
    return this.getJson('/api/author');
  }

  wikiAuthor(authorName, lng) {
    return this.getJson('/api/wiki/' + lng + '/' + authorName);
  }

  /* POST */
  postForm(cmd, params) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl + cmd, params, { headers: headers},
    );
  }

  storeWikiAuthorImg(url, id) {
    return this.postForm('/api/author/wiki/store', {url, id});
  }

  scanCover() {
    return this.postForm('/api/book/scan', {});
  }

  finishCover(bookId) {
    return this.postForm('/api/book/use/' + bookId, {});
  }

  pasteBookCover(bookId) {
    return this.postForm('/api/paste/book/' + bookId, {});
  }

  pasteAuthorPicture(authorId) {
    return this.postForm('/api/paste/author/' + authorId, {});
  }

  getBookCover(bookId) {
    return this.postForm('/api/getimage/book/' + bookId, {});
  }

  getAuthorPicture(authorId) {
    return this.postForm('/api/getimage/author/' + authorId, {});
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
