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
    private utilService: UtilService,
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

  makeTitle(params: SearchParams) {
    if (this.utilService.isEmpty(params)) {
      return 'music-client';
    }
    let title = '';
    // console.log(params);
    if (+params.idcomp !== -1) {
      const person = this.utilService.getById(
        this.composers,
        params.idcomp,
        'ID');
      if (title.length > 0) {
        title += ';';
      }
      title += person.ReversedName;
    }
    if (+params.idperf !== -1) {
      const person = this.utilService.getById(
        this.performers,
        params.idperf,
        'ID');
      if (title.length > 0) {
        title += ';';
      }
      title += person.ReversedName;
    }
    if (+params.idcoll !== -1) {
      const album = this.utilService.getById(
        this.collections,
        params.idcoll,
        'ID');
      if (title.length > 0) {
        title += ';';
      }
      title += album.Title;
    }
    if (+params.idtag !== -1) {
      const item = this.utilService.getById(
        this.tags,
        params.idtag,
        'ID');
      if (title.length > 0) {
        title += ';';
      }
      title += item.Name;
    }
    if (+params.idinstrument !== -1) {
      const item = this.utilService.getById(
        this.instruments,
        params.idinstrument,
        'ID');
      if (title.length > 0) {
        title += ';';
      }
      title += item.Name;
    }
    return title;
  }

  afterFetch(albums) {
    this.albums = albums;
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

  storeTitle() {
    document.title = this.makeTitle(this.params);
    this.storageService.storeSearchTitle(document.title);
  }

  getAlbums(params: SearchParams) {
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
