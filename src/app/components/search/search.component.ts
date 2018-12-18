import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Person} from '../../classes/Person';
import {Album} from '../../classes/Album';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Tag} from '../../classes/Tag';
import {StorageService} from '../../services/storage.service';
import {SearchParams} from '../../classes/SearchParams';
import {MatDialog} from '@angular/material';
import {PersonService} from '../../services/person.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  albums: Album[];
  album: Album;
  composers: Person[];
  performers: Person[];
  collections: Album[];
  tags: Tag[];
  instruments;
  imgUrl = environment.apiServer + '/image/';
  lazyImages: any;
  lazyAttribute = 'data-src';
  // params: SearchParams;
  idcomp = -1;
  idperf = -1;
  idcoll = -1;
  idtag = -1;
  idinstrument = -1;
  list = true;

  constructor(private musicService: MusicService,
              private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private storageService: StorageService
              ) {
    route.params.subscribe(params => this.handleParams(<SearchParams>params));
  }

  toParams(params: SearchParams) {
    this.idcomp = params.idcomp;
    this.idperf = params.idperf;
    this.idcoll = params.idcoll;
    this.idtag = params.idtag;
    this.idinstrument = params.idinstrument;
  }

  handleParams(params: SearchParams) {
    if (params) {
      console.log(params);
      // this.params = params;
      this.storageService.storeSearchParameters(params);
      this.fetchThings(params);
      this.toParams(params);
    }
  }

  fetchThings(params) {
    this.albums = [];
    this.musicService.getSearchedAlbums(params).subscribe(
      (albums: Album[]) => {
        this.albums = albums;
        this.storageService.storeAlbums(albums);
        setTimeout(() => {
          this.setLazy();
          this.lazyLoad();
        }, 100);
      },
      err => console.error(err),
      () => console.log('searched albums fetched')
    );
  }

  toAlbum(id) {
    this.router.navigate(['/album', id]).then(() => {
      // this.storageService.storeSearchTitle(document.title);
      // this.storageService.storeSearchParameters(this.params);
    });
  }

  resetFilters() {
    this.idperf = this.idcoll = this.idcomp = this.idtag =
      this.idinstrument = -1;
  }

  getAlbums(list: boolean) {
    this.list = list;
    const params: SearchParams = {
      idcomp: this.idcomp,
      idperf: this.idperf,
      idcoll: this.idcoll,
      idtag: this.idtag,
      idinstrument: this.idinstrument
    };
    // console.log(this.params);
    this.router.navigate(['/search', params])
      .then(() => {
    });
  }

  elementInViewport(el) {
    const rect = el.getBoundingClientRect(),
        height = (window.innerHeight || document.documentElement.clientHeight),
        width = (window.innerWidth || document.documentElement.clientWidth),
        diff = 10;
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top - diff <= height &&
      rect.left <= width
    );
  }

  cleanLazy() {
    const that = this;
    this.lazyImages = Array.prototype.filter.call(this.lazyImages, function (l) {
      return l.getAttribute(that.lazyAttribute);
    });
  }

  augment_album(album: Album) {
    if (this.list) {
      album.ID = +album.ID;
      for (let i = 0; i < this.albums.length; i++) {
        const a = this.albums[i];
        if (this.albums[i].ID === album.ID) {
          a.album_performers = album.album_performers;
          a.album_componisten = album.album_componisten;
          a.album_tags = album.album_tags;
          a.pieces = album.pieces;
          a.cuesheets = album.cuesheets;
          break;
        }
      }
    }
  }

  lazyLoad() {
    const that = this;
    this.lazyImages.forEach((image) => {
      if (that.elementInViewport(image)) {
        const dataSrc = image.getAttribute(that.lazyAttribute);
        if (dataSrc) {
          that.musicService.getAlbumById(image.getAttribute('albumid')).subscribe(
            (album: Album) => that.augment_album(album)
          );
          image.src = dataSrc;
          image.removeAttribute(that.lazyAttribute);
        }
      }
    });
    this.cleanLazy();
  }

  setLazy() {
    this.lazyImages = document.querySelectorAll('.lazy');
  }

  lazy() {
    this.setLazy();
    this.lazyLoad();
    const that = this;
    window.onscroll = function() { that.lazyLoad(); };
    window.onresize = function() { that.lazyLoad(); };
  }

  getTypeAheads() {
    const qcomposers = this.musicService.getComposers('dropdown');
    const qperformers = this.musicService.getPerformers('dropdown');
    const qcollections = this.musicService.getCollections();
    const qtags = this.musicService.getTags();
    const qinstruments = this.musicService.getInstruments();
    forkJoin(qcomposers, qperformers, qcollections, qtags, qinstruments)
      .subscribe(
        (results) => {
          this.composers = <Person[]>results[0];
          this.performers = <Person[]>results[1];
          this.collections = <Album[]>results[2];
          this.tags = <Tag[]>results[3];
          this.instruments = results[4];
        },
        err => console.error(err),
        () => {
          // this.setSelected();
        }
      );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.lazy();
    }, 200);
  }

  ngOnInit() {
    this.getTypeAheads();
  }

}
