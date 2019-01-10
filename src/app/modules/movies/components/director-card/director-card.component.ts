import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Movie} from '../../../../classes/movies/Movie';
import {Director} from '../../../../classes/movies/Director';
import {MoviesService} from '../../services/movies.service';

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
    private moviesService: MoviesService,
  ) { }

  getImageUrl() {
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

  afterGetImage(results) {
    this.director.ImageUrl = results;
  }

  getImage() {
    if (confirm('Afbeelding ophalen?')) {
      this.moviesService.addDirectorImage(this.director.imdb_id).subscribe(
        results => this.afterGetImage(results)
      )
    }
  }

  ngOnInit() {
  }

}
