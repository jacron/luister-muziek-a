import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BooksService} from '../../../services/books.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-book-author-autocomplete',
  templateUrl: './book-author-autocomplete.component.html',
  styleUrls: ['./book-author-autocomplete.component.scss']
})
export class BookAuthorAutocompleteComponent implements OnInit {
  myControl = new FormControl();
  filteredItems;
  @Output() select = new EventEmitter();

  constructor(
    private booksService: BooksService,
  ) { }

  toAuthor(author) {
    this.select.emit(author);
  }

  clear() {
    this.myControl.setValue(null);
  }

  display(option) {
    if (!option) return option;
    // console.log(option);
    return option.first + ' ' + option.last;
  }

  ngOnInit() {
    this.filteredItems = this.myControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap( name => {
          if (!name || name.length < 2) {
            return of([]);
          } else {
            return this.booksService.searchAuthors(name || '');
          }
        })
      );
  }

}
