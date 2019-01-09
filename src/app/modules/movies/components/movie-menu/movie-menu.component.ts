import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movie-menu',
  templateUrl: './movie-menu.component.html',
  styleUrls: ['./movie-menu.component.scss']
})
export class MovieMenuComponent implements OnInit {
  @Input() movie: Movie;
  @Input() unwatch: boolean;
  @Output() unwatchChange = new EventEmitter();

  constructor(
    private router: Router,
    private moviesService: MoviesService,
  ) {
  }

  updateImageUrl(result) {
    if (result.status == 200) {
      this.movie.ImageUrl = result.ImageUrl;
    } else {
      console.log(result);
    }
  }

  getImage() {
    if (confirm('Afbeelding vervangen voor ' + this.movie.DisplayTitle + '?')) {
      this.moviesService.addImage(this.movie.imdb_id).subscribe(
        result => this.updateImageUrl(result)
      );
    }
  }

  play() {
    this.moviesService.play(this.movie.ID).subscribe();
  }

  toImdb() {
    window.open(environment.imdbTitle + this.movie.imdb_id);
  }

  toDetails() {
    this.router.navigate(['/movies', this.movie.ID]).then();
  }

  setUnwatch() {
    this.unwatchChange.emit(this.movie.ID);
  }

  ngOnInit() {
  }

}
