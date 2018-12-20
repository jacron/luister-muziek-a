import { Injectable } from '@angular/core';
import {UtilService} from './util.service';
import {Cuesheet} from '../classes/Cuesheet';

@Injectable()
export class CuesheetService {

  constructor(
    private util: UtilService,
  ) { }

  makeStukken(cuesheet: Cuesheet) {
    const stukken: string[] = [];
    cuesheet.cue.files.forEach(file => {
      if (file.tracks.length > 1) {
        file.tracks.forEach(track => {
          stukken.push(this.util.stripExtension(track.title));
        });
      } else {
        stukken.push(this.util.stripExtension(file.name));
      }
    });
    return stukken;
  }
}
