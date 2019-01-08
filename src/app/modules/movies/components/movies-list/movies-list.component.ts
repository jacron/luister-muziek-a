import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {Router} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Movie[];
  @Input() hideDirector: boolean;
  @Input() wrap: string;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
  ) { }

  toMovie(id) {
    // this.router.navigate(['/movie', id]);
    this.moviesService.play(id).subscribe();
  }

  updateImageUrl(movie: Movie, result) {
    if (result.status == 200) {
      movie.ImageUrl = result.ImageUrl;
    } else {
      console.log(result);
    }
  }

  getImage(e, movie: Movie) {
    e.stopPropagation();
    if (confirm('Afbeelding vervangen voor ' + movie.DisplayTitle + '?')) {
      this.moviesService.addImage(movie.imdb_id).subscribe(
        result => this.updateImageUrl(movie, result)
      );
    }
  }

  ngOnInit() {
  }

}
