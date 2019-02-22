import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-books-start',
  templateUrl: './books-start.component.html',
  styleUrls: ['./books-start.component.scss']
})
export class BooksStartComponent implements OnInit {
  books;
  myControl = new FormControl();

  constructor(
    private booksService: BooksService,
  ) { }

  onIsbnChange() {
    console.log(this.myControl.value);
  }

  ngOnInit() {
  }

}
