import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movies-recently-added',
  templateUrl: './movies-recently-added.component.html',
  styleUrls: ['./movies-recently-added.component.scss']
})
export class MoviesRecentlyAddedComponent implements OnInit, OnDestroy {
  movies: Movie[];
  globalListenScrollFunc: Function;
  globalListenTouchmoveFunc: Function;
  globalListenResizeFunc: Function;
  pageNr = 1;

  constructor(
    private moviesService: MoviesService,
    private renderer: Renderer2,
  ) { }

  getMovies() {
    this.moviesService.getRecentlyAcquiredMovies(this.pageNr, 10).subscribe(
      (films: Movie[]) => this.movies = films
    )
  }

  nextPage() {
    console.log('in next page!');
    this.pageNr++;
    this.moviesService.getRecentlyAcquiredMovies(this.pageNr, 10).subscribe(
      (films: Movie[]) => this.movies = this.movies.concat(films)
    )
  }

  handleScrollable(e) {
    // console.log(e);
    const el = e.srcElement.scrollingElement;
    const cardHeight = 460;
    // console.log(el.scrollTop, el.offsetHeight, el.scrollHeight);
    // if (el.scrollTop + el.offsetHeight > el.scrollHeight - 100) {
    if (el.scrollTop > el.scrollHeight - cardHeight - 400) {
      this.nextPage();
    }
    // const target = e.target;
    // console.log(target);
  }

  ngOnDestroy() {
    this.globalListenScrollFunc();
    // this.globalListenTouchmoveFunc();
    // this.globalListenResizeFunc();
  }

  ngOnInit() {
    this.getMovies();
    this.globalListenScrollFunc = this.renderer.listen(
      'document', 'scroll', (event) =>
        this.handleScrollable(event)
    );
  }

}
