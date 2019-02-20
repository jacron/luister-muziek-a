import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {BooksService} from '../../../services/books.service';

@Component({
  selector: 'app-author-autocomplete',
  templateUrl: './author-autocomplete.component.html',
  styleUrls: ['./author-autocomplete.component.scss']
})
export class AuthorAutocompleteComponent implements OnInit {
  myControl = new FormControl();
  filteredItems;

  constructor(
    private booksService: BooksService,
    private router: Router,
  ) { }

  toAuthor(val) {
    this.router.navigate(['author', val.id])
      .then();
  }

  clear() {
    this.myControl.setValue(null);
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
