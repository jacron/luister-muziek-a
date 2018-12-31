import { Component, OnInit } from '@angular/core';
import {FacetService} from '../../services/facet.service';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MusicService} from '../../services/music.service';
import {Album} from '../../classes/Album';
import {SearchParams} from '../../classes/SearchParams';
import {ListService} from '../../services/list.service';
import {StorageService} from '../../services/storage.service';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  model = null;
  myControl = new FormControl();
  chips: any[] = [];
  albums: Album[];
  params: SearchParams;
  facets = {
    composer: {
      rank: 1,
      name: 'Componist',
      icon: 'person',
      value: 'composer',
      color: '#eedddd',
      displayField: 'FullName',
      idfield: 'idcomp',
    },
    performer: {
      rank: 2,
      name: 'Performer',
      icon: 'person',
      value: 'performer',
      color: '#ddeedd',
      displayField: 'FullName',
      idfield: 'idperf',
    },
    pop: {
      rank: 3,
      name: 'Pop',
      icon: 'music_video',
      value: 'pop',
      color: '#ffdddd',
      displayField: 'FullName',
      idfield: 'idperf',

    },
    instrument: {
      rank: 4,
      name: 'Instrument',
      icon: 'mic_none',
      value: 'instrument',
      color: '#eeeeff',
      displayField: 'Name',
      idfield: 'idinstrument',

    },
    tag: {
      rank: 5,
      name: 'Tag',
      icon: 'person',
      value: 'tag',
      color: '#efefef',
      displayField: 'Name',
      idfield: 'idtag',

    },
    code: {
      rank: 6,
      name: 'Cataloguscode',
      icon: 'library_music',
      value: 'code',
      color: '',
      displayField: 'FullName',
      idfield: 'idcode',

    },
    collectie: {
      rank: 7,
      name: 'Collectie',
      icon: 'library_books',
      value: 'collection',
      color: '',
      displayField: 'Title',
      idfield: 'idperf',

    },
    title: {
      rank: 8,
      name: 'Titel',
      icon: 'search',
      value: 'title',
      color: '',
      displayField: 'FullName',
      idfield: 'idperf',

    },
  };

  constructor(
    private facetService: FacetService,
    private musicService: MusicService,
    private listService: ListService,
    private storageService: StorageService,
  ) { }

  private _filter(items: any[], value: any, displayField: string): any[] {
    if (!value || typeof value !== 'string' || value.length === 0 ||
      !items) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return items.filter((option: any) => {
      const str: string = <string>option[displayField];
      return str.toLowerCase().includes(filterValue);
    });
  }

  afterGetIems(results, type) {
    const facet = this.facets[type];
    const filteredItems = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(results, value, facet.displayField))
      );
    this.model = {
      placeholder: facet.name,
      filteredItems,
      displayField: facet.displayField,
      color: facet.color,
      type,
    };

  }

  add(facet) {
    const type = facet.value;
    switch (type) {
      case 'composer':
        this.musicService.getComposers('typeahead').subscribe(
            results => this.afterGetIems(results, type));
        break;
      case 'performer':
        this.musicService.getPerformers('typeahead').subscribe(
            results => this.afterGetIems(results, type));
        break;
      case 'pop':
        this.musicService.getPerformersGenre('pop').subscribe(
          results => this.afterGetIems(results, type));
        break;
    }
  }

  displayFn(val) {
    if (!this.model) {
      return null;
    }
    return val ? val[this.model.displayField] : val;
  }

  clear() {
    this.myControl.setValue(null);
  }

  clearChips() {
    this.chips = [];
    this.albums = [];
  }

  remove(facet) {
    console.log('remove', facet);
    this.chips = this.chips.filter(chip =>
      chip.type != facet.type && chip.id != facet.id);
    this.getAlbums();
  }

  normParams(): SearchParams {
    const params = {
      idcomp: -1,
      idperf: -1,
      idcoll: -1,
      idtag: -1,
      idinstrument: -1,
      search: '',
    };
    this.chips.forEach(chip => {
      const facet = this.facets[chip.type];
      params[facet.idfield] = chip.id;
    });
    this.params = params;
    return params;
  }

  afterFetch(albums) {
    this.albums = albums;

    // voor blader-functie in details pagina
    const list = this.listService.initialize(
      albums, this.params, '/home');
    this.storageService.storeList(list);
  }

  getAlbums() {
    this.albums = [];
    this.musicService.getSearchedAlbums(this.normParams()).subscribe(
      (albums: Album[]) => this.afterFetch(albums),
      err => console.error(err),
      () => {}
    );
  }

  makeChip(val) {
    this.chips = this.chips.filter(chip => chip.type != this.model.type);
    this.chips.push({
      name: val[this.model.displayField],
      color: this.model.color,
      id: val.ID,
      type: this.model.type,
    });
    this.getAlbums();
    this.model = null;
  }

  rankOrder = (a: KeyValue, b: KeyValue): number =>
    a.value.rank - b.value.rank;

  ngOnInit() {
  }

}
