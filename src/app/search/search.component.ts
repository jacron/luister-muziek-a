import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MusicService} from '../music.service';
import {Albums} from '../classes/Albums';
import {Person} from '../classes/Person';
import {Album} from '../classes/Album';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {MatSelect} from '@angular/material';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Tag} from '../classes/Tag';
// import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  albumsContainer: Albums;
  albums: Album[];
  album: Album;

  composers: Person[];
  performers: Person[];
  composerId = -1;
  performerId = -1;
  collectionId = -1;
  tagId = -1;
  albumId = -1;
  collections: Album[];
  tags: Tag[];
  imgUrl = environment.apiServer + '/image/';
  lazyImages: any;
  lazyAttribute = 'data-src';
  selectedAlbum: Album;
  selectedComposer: Person = null;
  selectedPerformer: Person = null;
  selectedCollection: Album = null;
  selectedTag: Tag = null;
  @ViewChild('collectionSelect') collectionSelectElem: MatSelect;

  constructor(private musicService: MusicService,
              private route: ActivatedRoute,
              private router: Router
              ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    // console.log(params);
    if (params) {
      if (params.idcomp) {
        this.composerId = +params.idcomp;
        this.performerId = +params.idperf;
        this.collectionId = +params.idcoll;
        this.tagId = +params.idtag;
        this.fetchThings(params);
      }
    } else {
      this.albumsContainer = new Albums();
    }
  }

  fetchAlbum() {
    this.musicService.getAlbumById(this.albumId).subscribe(
      (album: Album) => {
        this.album = album;
      }
    );
  }

  fetchThings(params) {
    this.albums = [];
    this.musicService.getSearchedAlbums(params).subscribe(
      (albums: Album[]) => {
        this.albums = albums;
        console.log(albums);
        setTimeout(() => {
          this.setLazy();
          this.lazyLoad();
        }, 100);
      },
      err => console.error(err),
      () => console.log('searched albums fetched')
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
    const idtag = this.selectedTag ? this.selectedTag.ID : -1;
    this.router.navigate(['/search',
      {
        idcomp: idcomp,
        idperf: idperf,
        idcoll: idcoll,
        idtag: idtag
      }
    ]).then(() => {
    });
  }

  getAlbum(album) {
    this.router.navigate(['/album', album.ID]).then();
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

  augment_album(album: Album) {
    album.ID = +album.ID;
    for (let i = 0; i < this.albums.length; i++) {
      const a = this.albums[i];
      if (this.albums[i].ID === album.ID) {
        // console.log(album);
        a.album_performers = album.album_performers;
        a.album_componisten = album.album_componisten;
        a.pieces = album.pieces;
        a.cuesheets = album.cuesheets;
        break;
      }
    }
  }

  lazyLoad() {
    const that = this;
    this.lazyImages.forEach((image) => {
      if (that.elementInViewport(image)) {
        const dataSrc = image.getAttribute(that.lazyAttribute);
        if (dataSrc) {
          that.musicService.getAlbumById(image.id).subscribe(
            (album: Album) => that.augment_album(album)
          );
          // setTimeout(() => {
            image.src = dataSrc;
            image.removeAttribute(that.lazyAttribute);
          // }, 1000);
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

  displayNameFn(person): string {
    return person ? person.Name : person;
  }

  displayTitleFn(album): string {
    return album ? album.Title : album;
  }

  select(e) {
    e.target.select();
  }

  setSelected() {
    let title = '';
    if (this.composerId !== -1) {
      this.selectedComposer = this.getComposerById(this.composerId);
      title += this.selectedComposer.FullName;
    }
    if (this.performerId !== -1) {
      this.selectedPerformer = this.getPerformerById(this.performerId);
      // console.log(this.selectedPerformer);
      if (title.length) { title += ', '; }
      title += this.selectedPerformer.FullName;
    }
    if (this.collectionId !== -1) {
      this.selectedCollection = this.getCollectionById(this.collectionId);
      if (title.length) { title += ', '; }
      title += this.selectedCollection.Title;
    }
    document.title = title;
  }

  onSelectionChange() {
    // console.log(this.selectedComposer);
    // console.log(this.selectedCollection);
    // this.getTypeAheads();
  }

  getTypeAheads() {
    // const selection = {
    //   idcomp: this.selectedComposer ? this.selectedComposer.ID : null,
    //   idperf: this.selectedPerformer ? this.selectedPerformer.ID : null,
    //   idcoll: this.selectedCollection ? this.selectedCollection.ID : null
    // };
    // const selection = {
    //   idcomp: this.composerId,
    //   idperf: this.performerId,
    //   idcoll: this.collectionId
    // };
    // console.log(selection);
    const selection = null;
    const qcomposers = this.musicService.getComposers(selection);
    const qperformers = this.musicService.getPerformers(selection);
    const qcollections = this.musicService.getCollections(selection);
    const qtags = this.musicService.getTags(selection);
    forkJoin(qcomposers, qperformers, qcollections, qtags)
      .subscribe(
        (results) => {
          this.composers = <Person[]>results[0];
          this.performers = <Person[]>results[1];
          this.collections = <Album[]>results[2];
          this.tags = <Tag[]>results[3];
        },
        err => console.error(err),
        () => {
          console.log('all three collections are fetched');
          this.setSelected();
        }
      );
  }

  ngOnInit() {
    this.albumsContainer = new Albums();
    this.getTypeAheads();
  }


}
