import { Component, OnInit } from '@angular/core';
import {StateService} from '../../../../../services/state.service';
import {MoviesService} from '../../../services/movies.service';
import {Router} from '@angular/router';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Suggestion} from '../../../../../classes/movies/Suggestion';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-director-autocomplete',
  templateUrl: './director-autocomplete.component.html',
  styleUrls: ['./director-autocomplete.component.scss']
})
export class DirectorAutocompleteComponent implements OnInit {
  myControl = new FormControl();
  filteredItems;

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
    this.filteredItems = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        map(value => this._filter(results, value, 'name'))
      );
  }

  clear() {
    this.myControl.setValue(null);
  }

  getDirectors() {
    this.moviesService.getDirectors().subscribe(
      items => this.afterGetItems(items)
    )
  }

  displayFn(suggestion?: Suggestion): string | undefined {
    return suggestion ? suggestion.Titel : undefined;
  }

  ngOnInit() {
    this.getDirectors();
  }

}
