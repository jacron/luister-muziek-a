import { Injectable } from '@angular/core';
import {SearchParams} from '../../../classes/music/SearchParams';
import {MusicService} from '../../../services/music.service';
import {UtilService} from '../../../services/util.service';

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
      cls: facet.cls,
      id: id,
      type: type,
    });
  }

  makeChips(params: SearchParams, facets: any) {
    this.chips = [];
    this.facets = facets;
    if (this.utilService.isEmpty(params)) {
      return null;
    }
    if (params.idcomp != -1) {
      const id = params.idcomp;
      this.musicService.getComposerById(id).subscribe( item =>
          this.makeChippie('composer', item, id)
      );
    }
    if (params.idperf != -1) {
      const id = params.idperf;
      this.musicService.getPerformerById(id).subscribe( item =>
          this.makeChippie('performer', item, id)
      );
    }
    if (params.idinstrument != -1) {
      const id = params.idinstrument;
      this.musicService.getInstrumentById(id).subscribe( item =>
          this.makeChippie('instrument', item, id)
      );
    }
    if (params.idcoll != -1) {
      const id = params.idcoll;
      this.musicService.getCollectionById(id).subscribe(item =>
        this.makeChippie('collection', item, id)
      );
    }
    if (params.idtag != -1) {
      const id = params.idtag;
      this.musicService.getTagById(id).subscribe(item =>
        this.makeChippie('tag', item, id));
    }
    if (params.search != '') {
      const type = 'title';
      const facet = this.facets[type];
      const name = params.search;
      this.chips.push({
        cls: facet.cls,
        name: name,
        id: name,
        type: type,
      });
    }
    return this.chips;
  }
}
