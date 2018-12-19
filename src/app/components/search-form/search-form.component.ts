import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Album} from '../../classes/Album';
import {Tag} from '../../classes/Tag';
import {Person} from '../../classes/Person';
import {SearchParams} from '../../classes/SearchParams';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnChanges, OnInit {
  @Input() params: SearchParams;
  @Output() albums: EventEmitter<SearchParams> = new EventEmitter();

  emptychoice = '-- choose --';
  idcomp = -1;
  idperf = -1;
  idcoll = -1;
  idtag = -1;
  idinstrument = -1;
  composers: Person[];
  performers: Person[];
  collections: Album[];
  tags: Tag[];
  instruments;

  constructor(
    private musicService: MusicService,
  ) { }

  resetFilters() {
    this.idperf = this.idcoll = this.idcomp = this.idtag =
      this.idinstrument = -1;
  }

  getAlbums() {
    const params: SearchParams = {
      idcomp: this.idcomp || -1,
      idperf: this.idperf || -1,
      idcoll: this.idcoll || -1,
      idtag: this.idtag || -1,
      idinstrument: this.idinstrument || -1
    };
    this.albums.emit(params);
  }

  ngOnChanges(changes: SimpleChanges) {
    const params: SearchParams = <SearchParams>changes.params.currentValue;
    // console.log(params);
    this.idcomp = params.idcomp;
    this.idperf = params.idperf;
    this.idcoll = params.idcoll;
    this.idtag = params.idtag;
    this.idinstrument = params.idinstrument;
  }

  getItems() {
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
        }
      );
  }

  ngOnInit() {
    this.getItems();
  }

}
