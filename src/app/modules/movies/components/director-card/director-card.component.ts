import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Movie} from '../../../../classes/movies/Movie';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {
  @Input() director;
  @Input() movies: Movie[];
  @Output() filterTitle = new EventEmitter();
  query;

  constructor(
    private domSanatizer: DomSanitizer,
  ) { }

  getBackgroundImageUrl() {
    const imageUrl = this.director.ImageUrl;
    const sanatizedUrl = this.domSanatizer.bypassSecurityTrustResourceUrl(imageUrl);
    // const url = `url('${sanatizedUrl}')`;
    return sanatizedUrl;
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
