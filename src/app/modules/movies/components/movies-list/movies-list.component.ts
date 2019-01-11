import {Component, Input, OnDestroy, OnInit,
  Renderer2
} from '@angular/core';
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
  globalListenScrollFunc: Function;
  globalListenTouchmoveFunc: Function;
  globalListenResizeFunc: Function;
  pageNr = 1;
  // lazyImages: any;
  // lazyAttribute = 'data-src';

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private renderer: Renderer2,
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
    // console.log(id);
    this.moviesService.unwatch(id).subscribe(result =>
      this.afterUnwatch(result, id))
  }

  // elementInViewport(el) {
  //   const rect = el.getBoundingClientRect(),
  //     height = (window.innerHeight || document.documentElement.clientHeight),
  //     width = (window.innerWidth || document.documentElement.clientWidth),
  //     diff = 10;
  //   return (
  //     rect.bottom >= 0 &&
  //     rect.right >= 0 &&
  //     rect.top - diff <= height &&
  //     rect.left <= width
  //   );
  // }

  // cleanLazy() {
  //   const that = this;
  //   this.lazyImages = Array.prototype.filter.call(this.lazyImages, function (l) {
  //     return l.getAttribute(that.lazyAttribute);
  //   });
  // }
  //
  // lazyLoad() {
  //   const that = this;
  //   // console.log('in lazyload');
  //   if (!this.lazyImages) {
  //     return;
  //   }
  //   this.lazyImages.forEach((image) => {
  //     if (that.elementInViewport(image)) {
  //       const dataSrc = image.getAttribute(that.lazyAttribute);
  //       if (dataSrc) {
  //         // that.musicService.getAlbumById(image.getAttribute('albumid')).subscribe(
  //         //   (album: Album) => that.augment_album(album)
  //         // );
  //         image.src = dataSrc;
  //         image.removeAttribute(that.lazyAttribute);
  //       }
  //     }
  //   });
  //   this.cleanLazy();
  // }

  nextPage() {
    console.log('in next page!');

  }

  handleScrollable(e) {
    // console.log(e);
    const el = e.srcElement.scrollingElement;
    const cardHeight = 460;
    // console.log(el.scrollTop, el.offsetHeight, el.scrollHeight);
    // if (el.scrollTop + el.offsetHeight > el.scrollHeight - 100) {
    if (el.scrollTop > el.scrollHeight - cardHeight - 800) {
      this.nextPage();
    }
    // const target = e.target;
    // console.log(target);
  }

  // ngOnDestroy() {
  //   this.globalListenScrollFunc();
  //   this.globalListenTouchmoveFunc();
  //   this.globalListenResizeFunc();
  // }

  ngOnInit() {
    // this.globalListenScrollFunc = this.renderer.listen(
    //   'document', 'scroll', (event) =>
    //     this.handleScrollable(event)
    //   );
    // this.globalListenTouchmoveFunc = this.renderer.listen(
    //   'document', 'touchmove', () =>
    //     this.lazyLoad()
    // );
    // this.globalListenResizeFunc = this.renderer.listen(
    //   'window', 'resize', () =>
    //     this.lazyLoad()
    // );
  }

}
