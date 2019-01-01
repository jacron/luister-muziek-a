import { Injectable } from '@angular/core';
import {UtilService} from '../../services/util.service';
import {Cuesheet} from '../../classes/Cuesheet';
import {CFile} from '../../classes/CFile';

@Injectable()
export class CuesheetService {

  constructor(
    private util: UtilService,
  ) { }

  makeStukken(cuesheet: Cuesheet) {
    const tracknames: string[] = [];
    const files: CFile[] = [];

    cuesheet.cue.files.forEach(file => {
      if (file.tracks.length > 1) {
        file.tracks.forEach(track => {
          tracknames.push(track.title);
        });
      } else {
        files.push(file);
      }
    });
    return {
      tracknames: tracknames,
      files: files
    };
  }
}
