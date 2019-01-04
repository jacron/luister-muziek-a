import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../../classes/Movie';
import {Router} from '@angular/router';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Movie[];

  constructor(
    private router: Router,
    private moviesService: MoviesService,
  ) { }

  toMovie(id) {
    // this.router.navigate(['/movie', id]);
    this.moviesService.play(id).subscribe();
  }
  ngOnInit() {
    // console.log(this.movies);
  }

}
