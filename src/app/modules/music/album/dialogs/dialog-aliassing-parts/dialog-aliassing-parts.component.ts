import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Cuesheet} from '../../../../../classes/music/Cuesheet';
import {CFile} from '../../../../../classes/music/CFile';
import {LcsService} from '../../../services/lcs.service';
import {MusicService} from '../../../services/music.service';
import {Album} from '../../../../../classes/music/Album';
import {UtilService} from '../../../../../services/util.service';
import {forkJoin} from 'rxjs';
import {Piece} from '../../../../../classes/music/Piece';

@Component({
  selector: 'app-dialog-aliassing-parts',
  templateUrl: './dialog-aliassing-parts.component.html',
  styleUrls: ['./dialog-aliassing-parts.component.scss']
})
export class DialogAliassingPartsComponent implements OnInit {
  cuesheet: Cuesheet;
  album: Album;
  files: CFile[];
  pieces: Piece[];

  constructor(
    public dialogRef: MatDialogRef<DialogAliassingPartsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lcsService: LcsService,
    private musicServce: MusicService,
    private util: UtilService,
  ) { }

  tidyName(name) {
    name = this.util.stripExtension(name);
    name = name.trim();
    if (name.startsWith('-')) {
      name = name.substr(1);
    }
    return name.trim();
  }

  leftTrim() {
    this.files.forEach(
      (file: CFile) => file.proposedname = file.proposedname.substr(1)
    );
  }

  makeAliasses() {
    const lcsFilesLength = this.lcsService.lcs2(this.files.map(
      file => file.name
    ));
    this.files.forEach(
      file => file.proposedname =
        this.tidyName(file.name.substr(lcsFilesLength)));
  }

  unmakeAliasses() {
    this.files.forEach(
      file => file.proposedname = file.name);
  }

  onKeyup(e) {
    // console.log(e);
    if (e.altKey) {
      if (e.code === 'KeyT') {
        this.makeAliasses();
        e.stopPropagation();
      }
      if (e.code === 'KeyO') {
        e.stopPropagation();
        this.submit();
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  afterSuccess() {
    this.files.forEach((file: CFile) => file.displayname = file.proposedname);
    this.dialogRef.close();
  }

  submit() {
    const q = [];
    // console.log(this.files);
    // console.log(this.pieces);
    this.files.forEach((file: CFile) => {
      const foundPiece = this.pieces.find(piece => piece.Name === file.name);
      console.log(foundPiece);
      // console.log(file.proposedname);
      q.push(this.musicServce.saveAliasPiece(foundPiece.ID, file.proposedname));
    });
    forkJoin(q).subscribe(() => this.afterSuccess());
  }

  initProposal(file: CFile) {
    if (file.displayname && file.displayname.length > 0) {
      return file.displayname;
    } else {
      return this.util.stripExtension(file.name);
    }
  }

  ngOnInit() {
    this.cuesheet = this.data.cuesheet;
    this.album = this.data.album;
    // console.log(this.album);
    this.files = this.data.cuesheet.cue.files;
    this.pieces = this.data.album.pieces;
    this.files.forEach((file: CFile) =>
      file.proposedname = this.initProposal(file));
  }

}
