import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../../../classes/book/book';
import {StateService} from '../../../../services/state.service';
import {FormControl} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

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
    private toastr: ToastrService,
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
      response => this.toastr.success('cover finished')
    )
  }

  getCover() {
    this.booksService.getBookCover(this.book.id).subscribe(
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

  google() {
    window.open(environment.googleUrl + this.book.title + ' ' +
      this.book.date);
  }

  afterGetRemote(response, source) {
    console.log(response);
    if (response.matches && response.matches[0]) {
      this.proposal = response.matches[0];
      this.proposal.id = -1;
      this.proposal.source = source;
      this.notfound = null;
      this.toastr.success('gegevens zijn opgehaald!', source)
    } else {
      this.toastr.error('niet gevonden', source);
      this.notfound = source;
    }
  }

  remote(source) {
    const isbn = this.book.isbn13;
    console.log(isbn);
    this.notfound = null;
    this.proposal = null;
    this.toastr.info('haal gegevens op', source);
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
