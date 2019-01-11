import {Component, Input, OnInit,} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {Router} from '@angular/router';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Movie[];
  @Input() hideDirector: boolean;
  @Input() unwatch: boolean;
  @Input() wrap: string;
  @Input() more: string;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
  ) { }

  afterUnwatch(result, id) {
    if (result.status && result.status == 200) {
      const movie = this.movies.find(movie => movie.ID == id);
      this.movies.splice(this.movies.indexOf(movie), 1);
    }
  }

  toDetails(id) {
    this.router.navigate(['/movies', id]).then();
  }

  toMore() {
    this.router.navigateByUrl(this.more).then();
  }

  unwatchChange(id) {
    this.moviesService.unwatch(id).subscribe(result =>
      this.afterUnwatch(result, id))
  }

  ngOnInit() {
  }

}
