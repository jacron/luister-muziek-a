import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-menu',
  templateUrl: './movie-menu.component.html',
  styleUrls: ['./movie-menu.component.scss']
})
export class MovieMenuComponent implements OnInit {
  @Input() movie: Movie;
  @ViewChild('menu') menu;

  constructor(
    private router: Router,
  ) {
  }

  toImdb() {
    window.open(environment.imdbTitle + this.movie.imdb_id);
  }

  toDetails() {
    this.router.navigate(['/movies', this.movie.ID]).then();
  }

  cancelBubble(e) {
    console.log(e);
    // e.stopPropagation();
  }

  ngOnInit() {
  }

}
