import { Component, OnInit } from '@angular/core';
import {StateService} from '../../../../services/state.service';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MoviesService} from '../../services/movies.service';
import {Movie} from '../../../../classes/Movie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movies-start',
  templateUrl: './movies-start.component.html',
  styleUrls: ['./movies-start.component.scss']
})
export class MoviesStartComponent implements OnInit {
  model = null;
  myControl = new FormControl();

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

  getItems() {
    this.moviesService.getDirectors().subscribe(
      items => this.afterGetItems(items)
    )
  }

  ngOnInit() {
    this.stateService.setTitle('Movies');
    this.getItems();
  }

}
