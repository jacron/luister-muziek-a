import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../../services/movies.service';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {of} from 'rxjs';

@Component({
  selector: 'app-speler-autocomplete',
  templateUrl: './speler-autocomplete.component.html',
  styleUrls: ['./speler-autocomplete.component.scss']
})
export class SpelerAutocompleteComponent implements OnInit {
  myControl = new FormControl();
  filteredItems;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
  ) { }

  onSelectionChange() {
    this.router.navigate(['speler', this.myControl.value.id]).then();
  }

  clear() {
    this.myControl.setValue(null);
  }

  displayFn(suggestion?): string | undefined {
    return suggestion ? suggestion.naam : undefined;
  }

  ngOnInit() {
    this.filteredItems = this.myControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(name => {
          if (!name || name.length < 2) {
            return of([]);
          }
          return this.moviesService.searchSpelers(name || '');
        })
      );
  }

}
