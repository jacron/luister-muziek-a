import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Album} from '../../classes/Album';
import {Tag} from '../../classes/Tag';
import {Person} from '../../classes/Person';
import {SearchParams} from '../../classes/SearchParams';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnChanges, OnInit {
  @Input() params: SearchParams;
  @Input() composers: Person[];
  @Input() performers: Person[];
  @Input() collections: Album[];
  @Input() tags: Tag[];
  @Input() instruments;

  @Output() albums: EventEmitter<SearchParams> = new EventEmitter();

  emptychoice = '-- choose --';
  idcomp = -1;
  idperf = -1;
  idcoll = -1;
  idtag = -1;
  idinstrument = -1;

  constructor(
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
    // update search parameters after navigating
    if (changes.params) {
      const params: SearchParams = <SearchParams>changes.params.currentValue;
      // console.log(params);
      this.idcomp = params.idcomp;
      this.idperf = params.idperf;
      this.idcoll = params.idcoll;
      this.idtag = params.idtag;
      this.idinstrument = params.idinstrument;
    }
  }

  ngOnInit() {
  }

}
