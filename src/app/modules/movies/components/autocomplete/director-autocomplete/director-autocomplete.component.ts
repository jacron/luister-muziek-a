import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../../services/movies.service';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Suggestion} from '../../../../../classes/movies/Suggestion';
import {FormControl} from '@angular/forms';
import {of} from 'rxjs';

@Component({
  selector: 'app-director-autocomplete',
  templateUrl: './director-autocomplete.component.html',
  styleUrls: ['./director-autocomplete.component.scss']
})
export class DirectorAutocompleteComponent implements OnInit {
  myControl = new FormControl();
  filteredItems;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
  ) { }

  toDirector(val) {
    this.router.navigate(['director', val.id])
      .then();
  }

  clear() {
    this.myControl.setValue(null);
  }

  displayFn(suggestion?: Suggestion): string | undefined {
    return suggestion ? suggestion.Titel : undefined;
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
            return this.moviesService.searchDirectors(name || '');
          }
        })
      );
  }

}
