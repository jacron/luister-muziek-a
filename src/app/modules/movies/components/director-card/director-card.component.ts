import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Movie} from '../../../../classes/movies/Movie';
import {Director} from '../../../../classes/movies/Director';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {
  @Input() director: Director;
  @Input() movies: Movie[];
  @Output() filterTitle = new EventEmitter();
  query;

  constructor(
    private domSanatizer: DomSanitizer,
  ) { }

  getBackgroundImageUrl() {
    const imageUrl = this.director.ImageUrl;
    return this.domSanatizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

  search(newValue: string) {
    this.filterTitle.emit(newValue);
  }

  resetSearch() {
    this.query = null;
    this.filterTitle.emit(null);
  }

  ngOnInit() {
  }

}
