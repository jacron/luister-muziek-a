import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MusicService} from '../music.service';
import {Albums} from '../classes/Albums';
import {Person} from '../classes/Person';
import {Album} from '../classes/Album';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {MatSelect} from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  albumsContainer: Albums;
  albums: Album[];

  composers: Person[];
  performers: Person[];
  composerId = -1;
  collections: Album[];
  selectedCollectionId = null;
  selectedAlbum: Album;
  imgUrl = environment.apiServer + '/image/';
  lazyImages: any;
  lazyAttribute = 'data-src';
  selectedComposer = null;
  selectedPerformer = null;
  @ViewChild('collectionSelect') collectionSelectElem: MatSelect;

  constructor(private musicService: MusicService,
              private route: ActivatedRoute,
              private router: Router
              ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params) {
      console.log(params);
      this.fetchThings(params);
      this.composerId = +params.idc;
    } else {
      this.albumsContainer = new Albums();
    }
  }

  fetchThings(params) {
    this.albums = [];
    this.musicService.getAlbumsComponist(params.idc).subscribe(
      (albums: Albums) => {
        this.albumsContainer = albums;
        setTimeout(() => {
          this.setLazy();
          this.lazyLoad();
        }, 100);
      },
      err => console.error(err),
      () => console.log('componist albums fetched')
    );
  }

  getComposerById(id: number): Person {
    for (let i = 0; i < this.composers.length; i++) {
      const composer = this.composers[i];
      if (composer.ID === id) {
        return composer;
      }
    }
    return null;
  }

  getAlbumsComponist() {
    this.router.navigate(['/search',
      {
        idc: this.selectedComposer.ID,
        // idp: this.selectedPerformerId
      }
    ]).then(() => {
    });
  }

  getAlbum(album) {
    this.router.navigate(['/album', album.ID]).then();
  }

  // getAlbumAlbums(album) {
  //   this.musicService.getAlbumAlbums(album.ID).subscribe(
  //     (albums: Album[]) => {
  //       this.albums = albums;
  //       this.albumsContainer = new Albums();
  //       this.selectedAlbum = album;
  //     },
  //     err => console.error(err),
  //     () => console.log('album albums fetched')
  //   );
  // }

  getComposers() {
    this.musicService.getComposers().subscribe(
      (people: Person[]) => {
        this.composers = people;
        console.log(this.composerId);
        if (this.composerId !== -1) {
          this.selectedComposer = this.getComposerById(this.composerId);
        }
      },
      err => console.error(err),
      () => console.log('componisten fetched')
    );
  }

  getPerformers() {
    this.musicService.getPerformers().subscribe(
      (people: Person[]) => {
        this.performers = people;
      },
      err => console.error(err),
      () => console.log('performers fetched')
    );
  }

  getCollections() {
    this.musicService.getCollections().subscribe(
      (collections: Album[]) => {
        this.collections = collections;
      },
      err => console.error(err),
      () => console.log('collections fetched')
    );
  }

  elementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  cleanLazy() {
    const that = this;
    this.lazyImages = Array.prototype.filter.call(this.lazyImages, function (l) {
      return l.getAttribute(that.lazyAttribute);
    });
  }

  lazyLoad() {
    const that = this;
    this.lazyImages.forEach((image) => {
      if (that.elementInViewport(image)) {
        const dataSrc = image.getAttribute(that.lazyAttribute);
        if (dataSrc) {
          image.src = dataSrc;
          image.removeAttribute(that.lazyAttribute);
        }
      }
    });
    this.cleanLazy();
  }

  setLazy() {
    this.lazyImages = document.querySelectorAll('.lazy');
    console.log('lazyImages.length', this.lazyImages.length);
  }

  lazy() {
    this.setLazy();
    this.lazyLoad();
    const that = this;
    window.onscroll = function() { that.lazyLoad(); };
    window.onresize = function() { that.lazyLoad(); };
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.lazy();
    }, 200);
  }

  loadOnScroll() {
    this.setLazy();
    this.lazyLoad();
  }

  registerPanelScrollEvent(selectElem) {
    this.loadOnScroll();
    const panel = selectElem.panel.nativeElement;
    panel.addEventListener('scroll', () => this.loadOnScroll());
  }

  registerPanelOpenEvent(selectElem) {
    selectElem.onOpen.subscribe(() => this.registerPanelScrollEvent(selectElem));
  }

  displayFn(person): string {
    return person ? person.Name : person;
  }

  select(e) {
    e.target.select();
  }

  onComposerChange() {
    console.log(this.selectedComposer);
  }

  ngOnInit() {
    this.albumsContainer = new Albums();
    this.getComposers();
    this.getPerformers();
    this.getCollections();
    this.registerPanelOpenEvent(this.collectionSelectElem);
  }


}
