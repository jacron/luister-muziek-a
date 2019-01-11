import {Component, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-movies-recently-added',
  templateUrl: './movies-recently-added.component.html',
  styleUrls: ['./movies-recently-added.component.scss']
})
export class MoviesRecentlyAddedComponent implements OnInit, OnDestroy {
  @Input() wrap: boolean;
  @Input() more: boolean;
  @Input() count: number;

  movies: Movie[];
  globalListenScrollFunc: Function;
  // globalListenTouchmoveFunc: Function;
  // globalListenResizeFunc: Function;
  pageNr = 1;

  constructor(
    private moviesService: MoviesService,
    private renderer: Renderer2,
  ) { }

  getMovies() {
    this.moviesService.getRecentlyAcquiredMovies(this.pageNr, this.count).subscribe(
      (films: Movie[]) => this.movies = films
    )
  }

  nextPage() {
    // console.log('in next page!');
    this.pageNr++;
    this.moviesService.getRecentlyAcquiredMovies(this.pageNr, this.count).subscribe(
      (films: Movie[]) => this.movies = this.movies.concat(films)
    )
  }

  handleScrollable(e) {
    const el = e.srcElement.scrollingElement;
    if (el.scrollTop > el.scrollHeight - 860) {
      this.nextPage();
    }
  }

  ngOnDestroy() {
    if (!this.more) {
      this.globalListenScrollFunc();
      // this.globalListenTouchmoveFunc();
      // this.globalListenResizeFunc();
    }
  }

  ngOnInit() {
    if (!this.count) {
      this.count = 20;
    }
    this.getMovies();
    if (!this.more) {
      this.globalListenScrollFunc = this.renderer.listen(
        'document', 'scroll', (event) =>
          this.handleScrollable(event)
      );
      // this.globalListenTouchmoveFunc = this.renderer.listen(
      //   'document', 'touchmove', (event) =>
      //     this.handleScrollable(event)
      // );
      // this.globalListenResizeFunc = this.renderer.listen(
      //   'window', 'resize', (event) =>
      //     this.handleScrollable(event)
      // );
    }
  }

}
