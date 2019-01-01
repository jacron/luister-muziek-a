import { Injectable } from '@angular/core';
import {SearchParams} from '../classes/SearchParams';
import {MusicService} from './music.service';
import {UtilService} from './util.service';
// import {Facet} from '../classes/Facet';

@Injectable({
  providedIn: 'root'
})
export class ChipsService {
  chips = [];
  facets: any;

  constructor(
    private musicService: MusicService,
    private utilService: UtilService,
  ) { }

  makeChippie(type, item, id) {
    const facet = this.facets[type];
    this.chips.push({
      name: item[facet.displayField],
      color: facet.color,
      id: id,
      type: type,
    })

  }

  makeChips(params: SearchParams, facets: any) {
    this.chips = [];
    this.facets = facets;
    // console.log(params);
    if (this.utilService.isEmpty(params)) {
      return null;
    }
    if (params.idcomp != -1) {
      const id = params.idcomp;
      this.musicService.getComposerById(id).subscribe( item => {
          this.makeChippie('composer', item, id);
        }
      );
    }
    if (params.idperf != -1) {
      const id = params.idperf;
      this.musicService.getPerformerById(id).subscribe( item => {
          this.makeChippie('performer', item, id);
        }
      );
    }
    if (params.idinstrument != -1) {
      const id = params.idinstrument;
    }
    if (params.idcoll != -1) {
      const id = params.idcoll;
    }
    if (params.idtag != -1) {
      const id = params.idtag;
    }
    return this.chips;
  }
}
