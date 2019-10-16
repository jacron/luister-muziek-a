import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../../../classes/book/book';
import {Author} from '../../../classes/book/author';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  requestUrl = environment.booksServer + '/api';

  constructor(
    private http: HttpClient,
  ) { }

  /* GET */
  private getJson(cmd) {
    return this.http.get(this.requestUrl + cmd, {
      responseType: 'json'});
  }

  // getBooks() {
  //   return this.getJson('/books');
  // }

  getGenres() {
    return this.getJson('/book/genres')
  }

  searchAuthors(query) {
    return this.getJson('/search/authors/' + query);
  }

  searchTitles(query) {  // for autocomplete
    return this.getJson('/search/books/' + query);
  }

  searchTitlesFull(query) { // for full list
    return this.getJson('/search/books/' + query);
  }

  getAuthorBooks(authorId) {
    return this.getJson('/book/author/' + authorId);
  }

  getBook(bookId) {
    return this.getJson('/book/' + bookId);
  }

  getAuthor(authorId) {
    return this.getJson('/author/' + authorId);
  }

  getBookByIsbn(isbn) {
    return this.getJson('/book/isbn/' + isbn);
  }

  getRemote(isbn, source) {
    return this.getJson('/book/remote/' + isbn + '/' + source);
  }

  getBooksCount(genre) {
    return this.getJson('/book/count/' + genre);
  }

  getRecent(limit, genre) {
    return this.getJson(`/book/recent/${limit}/${genre}`);
  }

  getAuthors() {
    return this.getJson('/author');
  }

  getBarcodes() {
    return this.getJson('/book/barcode/list');
  }

  /* POST */
  postForm(cmd, params) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.requestUrl + cmd, params, { headers: headers},
    );
  }

  storeAuthorImgFromUrl(url, id) {
    return this.postForm(`/author/${id}/wiki/store`, {url});
  }

  // scanCover() {
  //   return this.postForm('/book/scan', {});
  // }

  finishCover(bookId) {
    return this.postForm('/book/use/' + bookId, {});
  }

  pasteBookCoverUrl(bookId) {
    return this.postForm('/paste/url/book/' + bookId, {});
  }

  pasteBookCover(bookId) {
    return this.postForm('/paste/book/' + bookId, {});
  }

  pasteAuthorPicture(authorId) {
    return this.postForm('/paste/author/' + authorId, {});
  }

  getBookCoverFromUrl(bookId) {
    return this.postForm('/getimage/book/' + bookId, {});
  }

  getAuthorPictureFromUrl(authorId) {
    return this.postForm('/getimage/author/' + authorId, {});
  }

  removeBook(bookId) {
    return this.postForm('/book/remove/' + bookId, {});
  }

  removeAuthor(authorId) {
    return this.postForm('/author/remove/' + authorId, {});
  }

  saveBook(book: Book) {
    return this.postForm('/book/save', {book});
  }

  saveAuthor(author: Author) {
    return this.postForm('/author/save', {author});
  }

  addBarcode(isbn, title) {
    return this.postForm('/book/barcode', {isbn, title});
  }

  deleteBarcodeList() {
    return this.postForm('/book/barcode/deletelist', {});
  }

}
