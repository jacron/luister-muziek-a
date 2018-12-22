import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Album} from '../../classes/Album';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchParams} from '../../classes/SearchParams';
import {StorageService} from '../../services/storage.service';
import {Tag} from '../../classes/Tag';
import {Person} from '../../classes/Person';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {UtilService} from '../../services/util.service';
import {Instrument} from '../../classes/Instrument';

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

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private util: UtilService,
  ) {
    route.params.subscribe(params => this.handleParams(<SearchParams>params));
  }

  handleParams(params: SearchParams) {
    if (params) {
      this.fetchThings(params);
      this.params = params;
      this.storageService.storeSearchParameters(params);
    }
  }

  afterFetch(albums) {
    this.albums = albums;

    // voor blader-functie in details pagina
    this.storageService.storeAlbums(albums);
  }

  fetchThings(params) {
    this.albums = [];
    this.musicService.getSearchedAlbums(params).subscribe(
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
      this.storageService.storeSearchTitle(title);
      this.musicService.addSearchToHistory(title, this.params);
    }
    document.title = title;
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
    // console.log(this.performers);
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
