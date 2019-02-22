import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {BooksService} from '../../../services/books.service';

@Component({
  selector: 'app-title-autocomplete',
  templateUrl: './title-autocomplete.component.html',
  styleUrls: ['./title-autocomplete.component.scss']
})
export class TitleAutocompleteComponent implements OnInit {
  searchControl = new FormControl();
  filteredOptions;

  constructor(
    private booksService: BooksService,
    private router: Router,
  ) { }

  toBook() {
    this.router.navigate(['books', this.searchControl.value.id]).then();
  }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(name => {
          if (!name || name.length < 2) {
            return of([]);
          }
          return this.booksService.searchTitles(name || '');
        })
      );
  }

}
