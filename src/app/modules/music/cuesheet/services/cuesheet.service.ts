import { Injectable } from '@angular/core';
import {Cuesheet} from '../../../../classes/music/Cuesheet';
import {CFile} from '../../../../classes/music/CFile';

@Injectable()
export class CuesheetService {

  constructor(
    // private lcsService: LcsService,
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
    // let shortFiles = files;
    // if (files.length > 1) {
    //   const lcsFilesLength = this.lcsService.lcs2(files.map(
    //     file => file.name));
    //   files.forEach(file =>
    //     file.shortname = file.name.substr(lcsFilesLength));
    // } else {
    //   files.forEach(file =>
    //     file.shortname = file.name);
    // }
    // if (tracknames.length > 1) {
    //   const lcsTracknamesLength = this.lcsService.lcs2(tracknames);
    //   tracknames.forEach(trackname =>
    //     trackname.substr(lcsTracknamesLength));
    // }
    return {
      tracknames: tracknames,
      files: files,
    };
  }
}
