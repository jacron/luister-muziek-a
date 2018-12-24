import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Album} from '../../classes/Album';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchParams} from '../../classes/SearchParams';
import {StorageService} from '../../services/storage.service';
import {Tag} from '../../classes/Tag';
import {Person} from '../../classes/Person';
import {forkJoin} from 'rxjs';
import {UtilService} from '../../services/util.service';
import {Instrument} from '../../classes/Instrument';
import {List} from '../../classes/List';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  albums: Album[];
  params: SearchParams;
  composers: Person[];
  performers: Person[];
  collections: Album[];
  tags: Tag[];
  instruments: Instrument[];
  list: List;
  search: string;

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private util: UtilService,
  ) {
    route.params.subscribe((params: SearchParams) => {
      if (params) {
        this.fetchThings(params);
        this.params = params;
        this.storageService.storeSearchParameters(params);
      }
    });
  }

  getAlbumIds(albums) {
    const ids = [];
    if (Array.isArray(albums)) {
      albums.forEach(album => ids.push(album.ID));
    }
    return ids;
  }

  normParams(params: SearchParams): SearchParams {
    // voorkom dat de back-end 'undefined' values krijgt
    return {
      idcomp: params.idcomp ? params.idcomp : -1,
      idperf: params.idperf ? params.idperf : -1,
      idcoll: params.idcoll ? params.idcoll : -1,
      idtag: params.idtag ? params.idtag : -1,
      idinstrument: params.idinstrument ? params.idinstrument : -1,
      search: params.search ? params.search : '',
    };
  }

  afterFetch(albums) {
    this.albums = albums;
    // console.log(albums[0]);

    // voor blader-functie in details pagina
    // this.storageService.storeAlbumIds(this.getAlbumIds(albums));
    this.list = {
      title: document.title,
      albumIds: this.getAlbumIds(albums),
      url: '/search',
      params: this.params
    };
    this.storageService.storeList(this.list);
  }

  fetchThings(params: SearchParams) {
    this.albums = [];
    this.musicService.getSearchedAlbums(this.normParams(params)).subscribe(
      (albums: Album[]) => this.afterFetch(albums),
      err => console.error(err),
      () => {}
    );
  }

  makeTitle(params: SearchParams) {
    return this.util.makeTitle([
      {
        items: this.composers,
        id: +params.idcomp,
        fieldname: 'FullName'
      },
      {
        items: this.performers,
        id: +params.idperf,
        fieldname: 'FullName'
      },
      {
        items: this.collections,
        id: +params.idcoll,
        fieldname: 'Title'
      },
      {
        items: this.tags,
        id: +params.idtag,
        fieldname: 'Name'
      },
      {
        items: this.instruments,
        id: +params.idinstrument,
        fieldname: 'Name'
      }
    ]);
  }

  storeTitle() {
    let title =  this.makeTitle(this.params);
    if (title.length === 0) {
      title = 'music-client';
    } else {
      // this.storageService.storeListTitle(title);
      this.musicService.addSearchToHistory(title, this.params);
    }
    if (this.list) {
      document.title = title;
      this.list.title = title;
      this.storageService.storeList(this.list);
    }
  }

  getAlbums(params: SearchParams) {
    // after change of search params
    this.router.navigate(['/search', params])
      .then(() => this.storeTitle()
    );
  }

  afterGetItems(results) {
    this.composers = <Person[]>results[0];
    this.performers = <Person[]>results[1];
    this.collections = <Album[]>results[2];
    this.tags = <Tag[]>results[3];
    this.instruments = results[4];
    this.storeTitle();
  }

  getItems() {
    const qcomposers = this.musicService.getComposers('typeahead');
    const qperformers = this.musicService.getPerformers('typeahead');
    const qcollections = this.musicService.getCollections();
    const qtags = this.musicService.getTags();
    const qinstruments = this.musicService.getInstruments();
    forkJoin(qcomposers, qperformers, qcollections, qtags, qinstruments)
      .subscribe(
        results => this.afterGetItems(results),
        err => console.error(err),
        () => {
        }
      );
  }

  ngOnInit() {
    this.getItems();
  }

}
