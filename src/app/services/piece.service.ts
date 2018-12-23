import { Injectable } from '@angular/core';
import {Piece} from '../classes/Piece';
import {MusicService} from './music.service';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Proposal} from '../classes/Proposal';

@Injectable()
export class PieceService {

  constructor(
    private musicService: MusicService
  ) { }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  updatePieceName(pieceId, pieceName, name, albumId) {
    const oldDisplayName = this.displayName(pieceName),
      newName = pieceName.replace(oldDisplayName, name);
    this.musicService.updatePieceName(pieceId, albumId, newName)
      .subscribe(
        (response) => console.log(response)
      );
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
    if (name.startsWith('- ')) {
      name = name.substr(2);
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

  getKeys(pieces: Piece[]): number[] {
    const keys = [];
    for (let k = 0; k < pieces.length; k++) {
      if (pieces[k].checked) { keys.push(k); }
    }
    return keys;
  }

  setChecked(keys: number[], pieces: Piece[]) {
    keys.sort((a, b) => {
      return a - b;
    });
    for (let k = 1; k < keys.length; k++) {
      const current = keys[k - 1],
            previous = keys[k];
      if (previous - current > 1) {
        for (let j = current + 1; j <= previous; j++) {
          pieces[j].checked = true;
        }
      }
    }
  }

  getCheckedIds(pieces: Piece[]) {
    const ids = [];
    pieces.forEach((piece: Piece) => {
      if (piece.checked) {
        ids.push(piece.ID.toString());
        piece.created = true;
      }
    });
    return ids;
  }

  checkOne(pieces) {
    const ids = this.getCheckedIds(pieces);
    if (!ids.length) {
      pieces[0].checked = true;
    }
  }

  selectSiblingsInbetween(e, i: number, pieces: Piece[]) {
    /**
     * Als je een item aanklikt met de shit-toets ingedrukt,
     * wil je dat tussenliggende items eveneens geselecteerd worden.
     * @type {any[]}
     */
    if (e.shiftKey) {
      const keys = this.getKeys(pieces);
      keys.push(i); // add currently clicked item
      if (keys.length > 1) {
        this.setChecked(keys, pieces);
      }
    }
    if (e.altKey) {
      this.checkOne(pieces);
      const data = this.lcs_pieces(pieces);
      if (data.ids.length) {
        titles.push(data.cueName);
      }

    }
  }

  similar(pieces) {
    const titles = [],
      ids = [];
    let active = false,
      common = '',
      old_common = '';
    for (let i = 0; i < pieces.length; i++) {
      const piece: Piece = pieces[i];
      if (piece.checked) {
        active = true;
      }
      if (active) {
        piece.checked = false;
        ids.push(piece.ID);
        titles.push(this.displayName(piece.Name));
        common = this.makeCuesheetName(titles);

        // evaluate similarity
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

  autoTest(albumId, pieces) {
    this.checkOne(pieces);
    let data;
    const proposals: Proposal[] = [];
    do {
      data = this.lcs_pieces(pieces);
      if (data.ids.length) {
        proposals.push({
          name: data.cueName,
          ids: data.ids
        });
      }
    } while (data.ids.length);
    return proposals;
  }

  autoCuesheets(albumId, proposals: Proposal[]) {
    return new Promise((resolve) => {
      const q = [];
      proposals.forEach(proposal => {
        q.push(this.musicService.makeCuesheet(proposal.name, proposal.ids,
          albumId));
      });
      forkJoin(q).subscribe(
        () => resolve('')
      );
    });
  }

}
