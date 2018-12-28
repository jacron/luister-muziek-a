import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatCheckbox, MatDialogRef} from '@angular/material';
import {MusicService} from '../../services/music.service';
import {Piece} from '../../classes/Piece';
import {PieceService} from '../../services/piece.service';
import {Album} from '../../classes/Album';
import {Proposal} from '../../classes/Proposal';

@Component({
  selector: 'app-dialog-pieces',
  templateUrl: './dialog-pieces.component.html',
  styleUrls: ['./dialog-pieces.component.scss']
})
export class DialogPiecesComponent implements OnInit {
  cueName: string;
  created: string[] = [];
  proposals: Proposal[] = [];
  @ViewChildren(MatCheckbox, { read: ElementRef }) checkBoxes: QueryList<MatCheckbox>;

  constructor(private musicService: MusicService,
              private pieceService: PieceService,
              public dialogRef: MatDialogRef<DialogPiecesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
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
    proposal.ids.forEach(id => {
      const piece = this.getPieceById(+id);
      piece.marked = true;
    });
    proposal.marked = true;
  }

  restorePieces(album: Album) {
    this.data.album.pieces = album.pieces;
    this.data.album.cuesheets = album.cuesheets;
    // todo: restore further (callback?)
    // this.data.pieces.forEach(piece => piece.marked = false);
  }

  reload() {
    this.musicService.refetch(this.data.albumId).subscribe(
      (response: Album) => this.restorePieces(response)
    );
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

  nameKeydown(e, piece: Piece, name) {
    if (e.key === 'Enter') {
      this.pieceService.updatePieceName(piece.ID, piece.Name, name,
        this.data.albumId);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.pieceService.updatePieceName(piece.ID, piece.Name, name,
        this.data.albumId);
    }
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
    if (!mode) {
      this.cueName = '';
    }
  }

  afterMakeAllProposals() {
    this.reload();
    this.dialogRef.close();
  }

  makeAllProposals() {
    this.pieceService.autoCuesheets(this.data.albumId, this.proposals)
      .then(() => this.afterMakeAllProposals());
  }

  autoTest() {
    this.proposals = this.pieceService.autoTest(
      this.data.albumId, this.data.pieces
    );
  }

  afterMakeCuesheet(proposal: Proposal) {
    proposal.created = true;
    this.reload();
  }

  makeCuesheet(proposal: Proposal) {
    this.musicService.makeCuesheet(proposal.name, proposal.ids,
      this.data.albumId).subscribe(
      () => this.afterMakeCuesheet(proposal)
    );
  }

  createCuesheet() {
    const ids = this.pieceService.getCheckedIds(this.data.pieces);

    this.proposals.push({
      name: this.cueName,
      ids: ids
    });
    this.selectAllPieces(false);

    // mark created
    this.data.pieces.forEach(piece => {
      if (ids.indexOf(piece.ID) !== -1) {
        piece.created = true;
      }
    });
  }

  ngOnInit() {
    // reset piece marking
    this.data.pieces.forEach(piece => piece.marked = false);
  }

}
