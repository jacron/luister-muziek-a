import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MusicService} from '../music.service';
import {Albums} from '../classes/Albums';
import {Person} from '../classes/Person';
import {Album} from '../classes/Album';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {MatSelect} from '@angular/material';
import {forkJoin} from 'rxjs/observable/forkJoin';
// import {Observable} from 'rxjs/Observable';


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
  performerId = -1;
  collectionId = -1;
  collections: Album[];
  // selectedCollectionId = null;
  selectedAlbum: Album;
  imgUrl = environment.apiServer + '/image/';
  lazyImages: any;
  lazyAttribute = 'data-src';
  selectedComposer: Person = null;
  selectedPerformer: Person = null;
  selectedCollection: Album = null;
  @ViewChild('collectionSelect') collectionSelectElem: MatSelect;

  constructor(private musicService: MusicService,
              private route: ActivatedRoute,
              private router: Router
              ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params) {
      this.fetchThings(params);
      this.composerId = +params.idcomp;
      this.performerId = +params.idperf;
      this.collectionId = +params.idcoll;
    } else {
      this.albumsContainer = new Albums();
    }
  }

  fetchThings(params) {
    this.albums = [];
    this.musicService.getSearchedAlbums(params).subscribe(
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
      const person = this.composers[i];
      if (person.ID === id) {
        return person;
      }
    }
    return null;
  }

  getPerformerById(id: number): Person {
    for (let i = 0; i < this.performers.length; i++) {
      const person = this.performers[i];
      if (person.ID === id) {
        return person;
      }
    }
    return null;
  }

  getCollectionById(id: number): Album {
    for (let i = 0; i < this.collections.length; i++) {
      const album = this.collections[i];
      if (album.ID === id) {
        return album;
      }
    }
    return null;
  }

  getAlbumsComponist() {
    const idcomp = this.selectedComposer ? this.selectedComposer.ID : -1;
    const idperf = this.selectedPerformer ? this.selectedPerformer.ID : -1;
    const idcoll = this.selectedCollection ? this.selectedCollection.ID : -1;
    this.router.navigate(['/search',
      {
        idcomp: idcomp,
        idperf: idperf,
        idcoll: idcoll
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
        if (this.composerId !== -1) {
          this.selectedComposer = this.getComposerById(this.composerId);
        }
        this.getPerformers();
      },
      err => console.error(err),
      () => console.log('componisten fetched')
    );
  }

  getPerformers() {
    this.musicService.getPerformers().subscribe(
      (people: Person[]) => {
        this.performers = people;
        if (this.performerId !== -1) {
          // setTimeout(() => {
            this.selectedPerformer = this.getPerformerById(this.performerId);
          // }, 100);
          this.getCollections();
        }
      },
      err => console.error(err),
      () => console.log('performers fetched')
    );
  }

  getCollections() {
    this.musicService.getCollections().subscribe(
      (collections: Album[]) => {
        this.collections = collections;
        if (this.collectionId !== -1) {
          // setTimeout(() => {
            this.selectedCollection = this.getCollectionById(this.collectionId);
          // }, 100);
        }
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
    // console.log('lazyImages.length', this.lazyImages.length);
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

  // loadOnScroll() {
  //   this.setLazy();
  //   this.lazyLoad();
  // }

  // registerPanelScrollEvent(selectElem) {
  //   console.log(selectElem);
  //   this.loadOnScroll();
  //   const panel = selectElem.panel.nativeElement;
  //   panel.addEventListener('scroll', () => this.loadOnScroll());
  // }

  // registerPanelOpenEvent(selectElem) {
  //   console.log(selectElem);
  // }

  displayFn(person): string {
    return person ? person.Name : person;
  }

  displayTitleFn(album): string {
    return album ? album.Title : album;
  }

  select(e) {
    e.target.select();
  }

  setSelected() {
    if (this.composerId !== -1) {
      this.selectedComposer = this.getComposerById(this.composerId);
    }
    if (this.performerId !== -1) {
      this.selectedPerformer = this.getPerformerById(this.performerId);
      // console.log(this.selectedPerformer);
    }
    if (this.collectionId !== -1) {
      this.selectedCollection = this.getCollectionById(this.collectionId);
    }
  }

  ngOnInit() {
    this.albumsContainer = new Albums();
    const composers = this.musicService.getComposers();
    const performers = this.musicService.getPerformers();
    const collections = this.musicService.getCollections();
    forkJoin(composers, performers, collections)
      .subscribe(
        (results) => {
          // console.log(results);
          this.composers = <Person[]>results[0];
          this.performers = <Person[]>results[1];
          this.collections = <Album[]>results[2];
        },
        err => console.error(err),
        () => {
          console.log('all three collections are fetched');
          this.setSelected();
        }
      );
    // this.getComposers();
    // this.getPerformers();
    // this.getCollections();
    // this.registerPanelOpenEvent(this.collectionSelectElem);
    // this.registerPanelScrollEvent(this.collectionSelectElem);
  }


}
