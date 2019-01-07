import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {StateService} from '../../../../../services/state.service';
import {MoviesService} from '../../../services/movies.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-title-autocomplete',
  templateUrl: './title-autocomplete.component.html',
  styleUrls: ['./title-autocomplete.component.scss']
})
export class TitleAutocompleteComponent implements OnInit {
  searchControl = new FormControl();
  filteredOptions;

  constructor(
    private stateService: StateService,
    private moviesService: MoviesService,
    private router: Router,

  ) { }

  initSearch() {
    this.router.navigate(['movies', this.searchControl.value.ID]).then();
  }

  onSelectionChange() {
    this.initSearch();
  }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(name => {
          if (name.length < 2) {
            return of([]);
          }
          return this.moviesService.searchMovies(name || '');
        })
      );
  }

}
