import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {Speler} from '../../../../classes/movies/Speler';

@Component({
  selector: 'app-speler-card',
  templateUrl: './speler-card.component.html',
  styleUrls: ['./speler-card.component.scss']
})
export class SpelerCardComponent {
  @Input() speler: Speler;
  @Input() movies: Movie[];
  @Output() filterTitle = new EventEmitter();
  query;

  constructor(
  ) { }

  search(newValue: string) {
    this.filterTitle.emit(newValue);
  }

  resetSearch() {
    this.query = null;
    this.filterTitle.emit(null);
  }

}
