import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../../../classes/book/book';
import {StateService} from '../../../../services/state.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: Book;
  showEdit = true;
  proposal: Book;
  notfound = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGetBook(response) {
    console.log(response);
    this.book = response;
    this.stateService.setTitle(this.book.title);
    document.title = this.book.title;
  }

  handleParams(params) {
    if (params) {
      if (params.idbook) {
        this.booksService.getBook(params.idbook).subscribe(
          response => this.afterGetBook(response)
        );
      }
    }
  }

  scanCover() {
    this.booksService.scanCover().subscribe(
      response => console.log(response)
    )
  }

  finishCover() {
    this.booksService.finishCover(this.book.id).subscribe(
      response => console.log(response)
    )
  }

  getCover() {
    this.booksService.getCover(this.book.id).subscribe(
      response => console.log(response)
    )
  }

  add() {
    this.book = {
      id: -1,
      isbn: '',
      isbn13: '',
      title: '',
      subtitle: '',
      imgurl: '',
      notes: '',
      pubinfo: '',
      author_id: this.book.author_id,
      author: this.book.author,
      genre: '',
      date: '',
      tags: '',
      translator: '',
      original_title: '',
    };
    this.showEdit = true;
  }

  remove() {
    if (confirm('Remove this book?')) {
      this.booksService.removeBook(this.book.id).subscribe(
        response => console.log(response)
      )
    }
  }

  // bolcomcover() {
  //   this.booksService.getBolcomCover(this.book.isbn).subscribe(
  //     response => console.log(response)
  //   )
  // }

  afterGetRemote(response, source) {
    console.log(response);
    if (response.matches && response.matches[0]) {
      this.proposal = response.matches[0];
      this.proposal.id = -1;
      this.proposal.source = source;
      this.notfound = null;
    } else {
      this.notfound = source;
    }
  }

  remote(source) {
    const isbn = this.book.isbn13;
    console.log(isbn);
    this.notfound = null;
    this.proposal = null;
    this.booksService.getRemote(isbn, source).subscribe(
      response => this.afterGetRemote(response, source)
    )
  }

  edit() {
    this.showEdit = !this.showEdit;
  }

  ngOnInit() {
  }

}
