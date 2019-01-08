import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../../services/movies.service';
import {Router} from '@angular/router';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Suggestion} from '../../../../../classes/movies/Suggestion';
import {FormControl} from '@angular/forms';

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

  toSpeler(val) {
    this.router.navigate(['speler', val.id])
      .then();
  }

  afterGetItems(results) {
    this.filteredItems = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        map(value => this._filter(results, value, 'naam'))
      );
  }

  clear() {
    this.myControl.setValue(null);
  }

  getSpelers() {
    this.moviesService.getSpelers().subscribe(
      items => this.afterGetItems(items)
    )
  }

  displayFn(suggestion?): string | undefined {
    return suggestion ? suggestion.naam : undefined;
  }

  ngOnInit() {
    this.getSpelers();
  }

}
