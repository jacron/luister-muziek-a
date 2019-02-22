import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../../../classes/book/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: Book;
  showEdit = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    // private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGetBook(response) {
    console.log(response);
    this.book = response;
    // this.stateService.setTitle(this.movie.Titel);
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
      this.booksService.remove(this.book.id).subscribe(
        response => console.log(response)
      )
    }
  }

  edit() {
    this.showEdit = !this.showEdit;
  }

  ngOnInit() {
  }

}
