import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatCheckbox, MatDialogRef} from '@angular/material';
import {MusicService} from '../../../services/music.service';
import {Piece} from '../../../../../classes/music/Piece';
import {PieceService} from '../../services/piece.service';
import {Proposal} from '../../../../../classes/music/Proposal';
import {LcsService} from '../../../services/lcs.service';
import {UtilService} from '../../../../../services/util.service';
import {forkJoin} from 'rxjs';
import {Album} from '../../../../../classes/music/Album';

@Component({
  selector: 'app-dialog-pieces',
  templateUrl: './dialog-pieces.component.html',
  styleUrls: ['./dialog-pieces.component.scss']
})
export class DialogPiecesComponent implements OnInit {
  cueName = '';
  created = [];
  proposals: Proposal[] = [];
  model;
  modelProposal;
  @ViewChildren(MatCheckbox, { read: ElementRef }) checkBoxes: QueryList<MatCheckbox>;

  constructor(private musicService: MusicService,
              private pieceService: PieceService,
              public dialogRef: MatDialogRef<DialogPiecesComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any,
              private lcsService: LcsService,
              private util: UtilService,
  ) { }

  onPieceCheck(e, piece: Piece) {
    if (!this.cueName) {
      this.cueName = this.displayName(piece.Name);
    }
  }

  onPieceClick(e, piece: Piece, i: number) {
    if (!piece.checked) {
      this.pieceService.selectSiblingsInbetween(e, i, this.data.pieces);
    }
  }

  removeProposal(proposal: Proposal) {
    this.proposals = this.proposals.filter(prop => prop !== proposal);
  }

  getPieceById(id) {
    for (let i = 0; i < this.data.pieces.length; i++) {
      const piece = this.data.pieces[i];
      if (piece.ID === id) {
        return piece;
      }
    }
    return null;
  }

  resetMarks() {
    this.data.pieces.forEach(piece => piece.marked = false);
    this.proposals.forEach(proposal => proposal.marked = false);
  }

  markPieces(proposal: Proposal) {
    this.resetMarks();
    proposal.pieces.forEach(piece => {
      // const piece: Piece = this.getPieceById(+id);
      piece.marked = true;
    });
    proposal.marked = true;
  }

  // restorePieces(album: Album) {
  //   this.data.album.pieces = album.pieces;
  //   this.data.album.cuesheets = album.cuesheets;
  //   // todo: restore further (callback?)
  //   // this.data.pieces.forEach(piece => piece.marked = false);
  // }
  //
  // reload() {
  //   this.musicService.refetch(this.data.albumId).subscribe(
  //     (response: Album) => this.restorePieces(response)
  //   );
  // }

  leftTrim() {
    this.data.pieces.forEach((piece: Piece) => {
      if (piece.marked) {
        piece.DisplayName = piece.DisplayName.substr(1);
      }
    });
  }

  lcs() {
    const lines = [];
    this.data.pieces.forEach((piece: Piece) => {
      if (piece.checked) {
        const name = this.pieceService.displayName(piece.Name);
        lines.push(name);
      }
    });
    this.cueName = this.pieceService.makeCuesheetName(lines);
  }

  displayName(s) {
    return this.pieceService.displayName(s);
  }

  updatePieceName(piece: Piece, name) {
    piece.DisplayName = name;
  }

  updateProposalName(proposal: Proposal, name) {
    proposal.name = name;
  }

  saveProposalName(e, proposal: Proposal, model) {
    if (e.key === 'Enter') {
      this.updateProposalName(proposal, model);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updateProposalName(proposal, model);
    }

  }

  saveDisplayName(e, piece: Piece, name, model) {
    if (e.key === 'Enter') {
      this.updatePieceName(piece, model);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updatePieceName(piece, model);
    }
  }

  piecesMarked() {
    let n = 0;
    for (let i = 0; i < this.data.pieces.length; i++) {
      if (this.data.pieces[i].marked) {
        n++;
      }
    }
    return n;
  }

  piecesSelected() {
    let n = 0;
    for (let i = 0; i < this.data.pieces.length; i++) {
      if (this.data.pieces[i].checked) {
        n++;
      }
    }
    return n;
  }

  selectAllPieces(mode) {
    this.data.pieces.forEach((piece) => {
      piece.checked = mode;
    });
    if (mode) {
      const album: Album = this.data.album;
      this.cueName = album.Title;
    }
  }

  makeAllProposals() {
    const q = [];
    this.proposals.forEach((proposal: Proposal) => {
      q.push(this.musicService.makeCuesheet(
        proposal,
        this.data.albumId));
    });
    forkJoin(q).subscribe(
      () => this.dialogRef.close('success')
    );
  }

  afterMakeCuesheet(proposal: Proposal) {
    proposal.created = true;
    // this.reload();
  }

  makeCuesheet(proposal: Proposal) {
    this.musicService.makeCuesheet(
      proposal,
      this.data.albumId).subscribe(
      () => this.afterMakeCuesheet(proposal)
    );
  }

  untidy() {
    this.data.pieces.forEach((piece: Piece) => {
        if (piece.marked) {
          piece.DisplayName = piece.Name;
        }
      }
    );
  }

  tidy() {
    const markedPieces = this.data.pieces.filter(
      (piece: Piece) => piece.marked
    );
    const len = this.lcsService.lcs2(markedPieces.map(
      (piece: Piece) => piece.Name
    ));
    this.data.pieces.forEach((piece: Piece) => {
        if (piece.marked) {
          piece.DisplayName = piece.DisplayName.substr(len);
        }
      }
    );
  }

  autoTest() {
    this.selectAllPieces(false);
    this.proposals = this.pieceService.autoTest(
      this.data.albumId, this.data.pieces
    );
  }

  createCuesheet() {
    const pieces = this.data.pieces.filter(piece => piece.checked);
    this.selectAllPieces(false);
    // console.log(this.cueName);
    this.proposals.push({
      name: this.cueName,
      pieces: pieces,
    });
    this.resetMarks();
    pieces.forEach(piece => piece.marked = true);
  }

  ngOnInit() {
    // reset piece marking
    this.data.pieces.forEach((piece: Piece) => {
      piece.marked = false;
      if (!piece.DisplayName || piece.DisplayName.length === 0) {
        piece.DisplayName = this.util.stripExtension(piece.Name);
      }
    });
  }

}
