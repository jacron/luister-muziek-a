import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {DomSanitizer} from '@angular/platform-browser';
import {Speler} from '../../../../classes/movies/Speler';

@Component({
  selector: 'app-speler-card',
  templateUrl: './speler-card.component.html',
  styleUrls: ['./speler-card.component.scss']
})
export class SpelerCardComponent implements OnInit {
  @Input() speler: Speler;
  @Input() movies: Movie[];
  @Output() filterTitle = new EventEmitter();
  query;

  constructor(
    private domSanatizer: DomSanitizer,
  ) { }

  getBackgroundImageUrl() {
    // const imageUrl = this.speler.ImageUrl;
    // return this.domSanatizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

  search(newValue: string) {
    this.filterTitle.emit(newValue);
  }

  resetSearch() {
    this.query = null;
    this.filterTitle.emit(null);
  }  ngOnInit() {
  }

}
