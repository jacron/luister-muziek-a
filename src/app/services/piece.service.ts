import { Injectable } from '@angular/core';
import {Piece} from '../classes/Piece';
import {MusicService} from './music.service';

@Injectable()
export class PieceService {

  constructor(
    private musicService: MusicService
  ) { }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  displayName(s) {
    // ltrim numeric
    const parts = s.split(' ');
    if (this.isNumeric(parts[0])) {
      parts.shift();
    }
    s = parts.join(' ');
    // rtrim extension
    const rpos = s.lastIndexOf('.');
    if (rpos !== -1) {
      // return extension also?
      s = s.substr(0, rpos);
    }
    let e;
    do {
      e = s.endsWith('.');
      if (e) {
        s = s.substr(0, s.length - 1);
      }
    } while (e);
    return s;
  }

  getSmallest(lines) {
    let small = '';
    lines.forEach(function(line) {
      if (small.length < line.length) {
        small = line;
      }
    });
    return small;
  }

  makeCuesheetName(lines) {
    let name = this.lcs(lines).trim();
    if (name.endsWith('I')) {
      name = name.substr(0, name.length - 1);
    }
    name = name.trim();
    if (name.endsWith(' -')) {
      name = name.substr(0, name.length - 2);
    }
    if (name.endsWith(':')) {
      name = name.substr(0, name.length - 1);
    }
    return name;
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

  selectSiblingsInbetween(e, i, pieces) {
    const keys = [];
    if (e.shiftKey) {
      for (let k = 0; k < pieces.length; k++) {
        if (pieces[k].checked) { keys.push(k); }
      }
      keys.push(i);
    }
    // console.log(keys);
    if (keys.length > 1) {
      for (let k = 1; k < keys.length; k++) {
        const first = keys[k - 1],
          last = keys[k];
        if (last - first > 1) {
          for (let j = first + 1; j <= last; j++) {
            pieces[j].checked = true;
          }
        }
      }
    }
  }

  similar(pieces) {
    const titles = [],
      ids = [];
    let active = false,
      common = '',
      old_common = '';
    for (let i = 0; i < pieces; i++) {
      const piece: Piece = pieces[i];
      if (piece.checked) {
        active = true;
      }
      if (active) {
        piece.checked = false;
        ids.push(piece.ID);
        titles.push(this.displayName(piece.Name));
        common = this.makeCuesheetName(titles);
        if (titles.length > 2 && common.length < old_common.length - 2) {
          titles.pop();
          ids.pop();
          piece.checked = true;
          break;
        }
        old_common = common;
      }
    }
    return {
      titles: titles,
      ids: ids
    };
  }

  lcs_pieces(pieces) {
    let titles = [],
      ids = [];
    pieces.forEach((piece: Piece) => {
      if (piece.checked) {
        titles.push(this.displayName(piece.Name));
        ids.push(piece.ID.toString());
      }
    });
    if (titles.length === 1) {
      const data = this.similar(pieces);
      titles = data.titles;
      ids = data.ids;
    }
    const cueName = this.makeCuesheetName(titles);
    return {
      ids: ids,
      cueName: cueName
    };
  }

  afterCreation(cueName) {
    console.log(cueName);
    // this.created.push(cueName)
  }

  autoCuesheets(albumId, pieces) {
    let data;
    do {
      data = this.lcs_pieces(pieces);
      if (data.ids.length) {
        this.musicService.makeCuesheet(data.cueName, data.ids,
          albumId).subscribe(
          () => this.afterCreation(data.cueName)
        );
      }
    } while (data.ids.length);
  }

}
