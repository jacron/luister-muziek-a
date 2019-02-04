import { Injectable } from '@angular/core';
import {Piece} from '../../../classes/music/Piece';
import {MusicService} from '../../../services/music.service';
import {Proposal} from '../../../classes/music/Proposal';
import {LcsService} from '../../../services/lcs.service';

@Injectable()
export class PieceService {

  constructor(
    private musicService: MusicService,
    private lcsService: LcsService,
  ) { }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  // updatePieceName(pieceId, pieceName, name, albumId) {
  //   const oldDisplayName = this.displayName(pieceName),
  //     newName = pieceName.replace(oldDisplayName, name);
  //   this.musicService.updatePieceName(pieceId, albumId, newName)
  //     .subscribe(
  //       (response) => console.log(response)
  //     );
  // }

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

  trimEnd(name: string, end: string[]) {
    end.forEach(e => {
      if (name.endsWith(e)) {
        name = name.substr(0, name.length - 1);
      }
    });
    return name;
  }

  makeCuesheetName(lines) {
    let name = this.lcsService.lcs(lines).trim();
    if (name.endsWith('I')) {
      name = name.substr(0, name.length - 1);
    }
    name = name.trim();
    name = this.trimEnd(name, ['-', '_', ':', ';', ',', '.']);
    if (name.startsWith('-')) {
      name = name.substr(1);
    }
    return name.trim();
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
  }

  similar(pieces) {
    const titles = [],
      npieces = [];
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
        npieces.push(piece);
        titles.push(this.displayName(piece.Name));
        common = this.makeCuesheetName(titles);

        // evaluate similarity
        if (titles.length > 2 && common.length < old_common.length - 2) {
          titles.pop();
          npieces.pop();
          piece.checked = true;
          break;
        }
        old_common = common;
      }
    }
    return {
      titles: titles,
      pieces: npieces,
    };
  }

  lcs_pieces(pieces) {
    let titles = [],
      npieces = [];
    pieces.forEach((piece: Piece) => {
      if (piece.checked) {
        titles.push(this.displayName(piece.Name));
        npieces.push(piece);
      }
    });
    if (titles.length === 1) {
      const data = this.similar(pieces);
      titles = data.titles;
      npieces = data.pieces;
    }
    const cueName = this.makeCuesheetName(titles);
    return {
      pieces: npieces,
      cueName: cueName
    };
  }

  autoTest(albumId, pieces) {
    pieces.forEach(piece => piece.checked = false);
    pieces[0].checked = true;

    let data;
    const proposals: Proposal[] = [];
    do {
      data = this.lcs_pieces(pieces);
      if (data.pieces.length) {
        proposals.push({
          name: data.cueName,
          pieces: data.pieces,
          // ids: data.ids
        });
      }
    } while (data.pieces.length);
    return proposals;
  }


}
