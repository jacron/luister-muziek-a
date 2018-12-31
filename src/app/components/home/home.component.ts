import { Component, OnInit } from '@angular/core';
import {FacetService} from '../../services/facet.service';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MusicService} from '../../services/music.service';
import {Album} from '../../classes/Album';
import {SearchParams} from '../../classes/SearchParams';
import {ListService} from '../../services/list.service';
import {StorageService} from '../../services/storage.service';

const color = {
  composer: '#eedddd',
  performer: '#ddeedd',

};

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
  facets = [
    {
      name: 'Componist',
      icon: 'person',
      value: 'composer',
      color: color.composer,
    },
    {
      name: 'Performer',
      icon: 'person',
      value: 'performer',
      color: color.performer,
    },
    {
      name: 'Pop',
      icon: 'music_video',
      value: 'pop',
    },
    {
      name: 'Instrument',
      icon: 'mic_none',
      value: 'instrument',
    },
    {
      name: 'Tag',
      icon: 'person',
      value: 'tag',
    },
    {
      name: 'Cataloguscode',
      icon: 'library_music',
      value: 'code',
    },
    {
      name: 'Collectie',
      icon: 'library_books',
      value: 'collection',
    },
    {
      name: 'Titel',
      icon: 'search',
      value: 'title',
    },

  ];

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

  add(facet) {
    this.afterChoice(facet.value);
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
    // voorkom dat de back-end 'undefined' values krijgt
    const params = {
      idcomp: -1,
      idperf: -1,
      idcoll: -1,
      idtag: -1,
      idinstrument: -1,
      search: '',
    };
    this.chips.forEach(chip => {
      switch(chip.type) {
        case 'composer':
          params.idcomp = chip.id;
          break;
        case 'performer':
          params.idperf = chip.id;
          break;
      }
    });
    // console.log(params);
    this.params = params;
    return params;
  }

  afterFetch(albums) {
    this.albums = albums;
    // console.log(albums);

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
    // console.log('selected', val);
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

  afterGetIems(results, displayField, placeholder, color, type) {
    // console.log(results, displayField, placeholder);
    const filteredItems = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(results, value, displayField))
      );
    this.model = {
      placeholder,
      filteredItems,
      displayField,
      color,
      type,
    };

  }

  afterChoice(response) {
    switch (response) {
      case 'composer':
        this.musicService.getComposers('typeahead')
          .subscribe(
            results => this.afterGetIems(results, 'FullName',
              'Componist', color.composer, response)
          );
        break;
      case 'performer':
        this.musicService.getPerformers('typeahead')
          .subscribe(
            results => this.afterGetIems(results, 'FullName',
              'Performer', color.performer, response)
          );
        break;
    }
  }

  ngOnInit() {
  }

}
