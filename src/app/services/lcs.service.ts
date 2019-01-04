import { Injectable } from '@angular/core';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class LcsService {

  constructor(
    // private util: UtilService,
  ) { }

  private getSmallest(lines) {
    let small = '';
    lines.forEach(line => {
      if (line && small.length < line.length) {
        small = line;
      }
    });
    return small;
  }

  lcs(lines) {
    const small = this.getSmallest(lines);
    let common = '';
    let temp_common = '';
    for (let i = 0; i < small.length; i++) {
      const c = small[i];
      temp_common += c;
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        if (line.indexOf(temp_common) === -1) {
          temp_common = c;
          for (let k = 0; k < lines.length; k++) {
            const line2 = lines[k];
            if (line2.indexOf(temp_common) === -1) {
              temp_common = '';
              break;
            }
          }
          break;
        }
      }
      if (temp_common !== '' && temp_common.length > common.length) {
        common = temp_common;
      }
    }
    return common;
  }

  private stripNumStart(line) {
    // console.log(line);
    if (!line) {
      return line;
    }
    const parts = line.split(' ');
    let part0 = '';
    if (+parts[0] == parts[0] || parts[0].endsWith(':')) {
      part0 = parts[0];
      parts.shift();
    }
    // console.log(parts.join(' '));
    return [parts.join(' '), part0];
  }

  lcs2(lines) {
    let stripped = '', numeric = '';
    const lcs = this.lcs(lines.map(line => {
      const ret = this.stripNumStart(line);
      if (ret) {
        stripped = ret[0];
        numeric = ret[1];
        return ret[0];
      }
    }));
    return lcs.length + numeric.length;
  }

}
