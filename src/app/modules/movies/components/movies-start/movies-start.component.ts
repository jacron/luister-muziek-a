import { Component, OnInit } from '@angular/core';
import {StateService} from '../../../../services/state.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {MoviesService} from '../../services/movies.service';
import {Router} from '@angular/router';
import {Suggestion} from '../../../../classes/movies/Suggestion';
import { of } from 'rxjs';

@Component({
  selector: 'app-movies-start',
  templateUrl: './movies-start.component.html',
  styleUrls: ['./movies-start.component.scss']
})
export class MoviesStartComponent implements OnInit {
  model = null;
  myControl = new FormControl();
  searchControl = new FormControl();
  filteredOptions;

  constructor(
    private stateService: StateService,
    private moviesService: MoviesService,
    private router: Router,
  ) { }

  private _filter(items: any[], value: any, displayField: string): any[] {
    if (!value || typeof value !== 'string' || value.length === 0 ||
      !items) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return items.filter((option: any) => {
      const str: string = <string>option[displayField];
      return str.toLowerCase().includes(filterValue);
    });
  }

  toDirector(val) {
    this.router.navigate(['director', val.id])
      .then();
  }

  afterGetItems(results) {
    const type = 'director';
    const filteredItems = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        map(value => this._filter(results, value, facet.displayField))
      );
    const facet = {
      name: 'Regisseur',
      filteredItems,
      displayField: 'name',
      cls: '',
    };
    this.model = {
      placeholder: facet.name,
      filteredItems,
      displayField: facet.displayField,
      cls: facet.cls,
      type,
    };
  }

  clear() {
    this.myControl.setValue(null);
  }

  getItems() {
    this.moviesService.getDirectors().subscribe(
      items => this.afterGetItems(items)
    )
  }

  displayFn(suggestion?: Suggestion): string | undefined {
    return suggestion ? suggestion.Titel : undefined;
  }

  initSearch() {
    this.router.navigate(['movies', this.searchControl.value.ID]).then();
  }

  onSelectionChange() {
    console.log(this.searchControl.value);
    this.initSearch();
  }

  ngOnInit() {
    this.stateService.setTitle('Movies');
    this.getItems();
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
