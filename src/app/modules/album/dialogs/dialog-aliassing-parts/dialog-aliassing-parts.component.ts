import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Cuesheet} from '../../../../classes/Cuesheet';
import {CFile} from '../../../../classes/CFile';
import {LcsService} from '../../../../services/lcs.service';
import {MusicService} from '../../../../services/music.service';
import {Album} from '../../../../classes/Album';
import {UtilService} from '../../../../services/util.service';

@Component({
  selector: 'app-dialog-aliassing-parts',
  templateUrl: './dialog-aliassing-parts.component.html',
  styleUrls: ['./dialog-aliassing-parts.component.scss']
})
export class DialogAliassingPartsComponent implements OnInit {
  cuesheet: Cuesheet;
  album: Album;
  files: CFile[];

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

  makeAliasses() {
    const lcsFilesLength = this.lcsService.lcs2(this.files.map(
      file => file.name
    ));
    this.files.forEach(
      file => file.proposedname = this.tidyName(file.name.substr(lcsFilesLength)));
  }

  afterSuccess() {
    this.files.forEach((file: CFile) => file.displayname = file.proposedname)
    this.dialogRef.close();
  }

  onKeyup(e) {
    // console.log(e);
    if (e.altKey) {
      if (e.code == 'KeyA') {
        this.makeAliasses();
        e.stopPropagation();
      }
      if (e.code == 'KeyO') {
        e.stopPropagation();
        this.submit();
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.files.forEach((file: CFile) => {
      const found = this.album.pieces.find(piece => piece.Name == file.name);
      if (found) {
        this.musicServce.saveAliasPiece(found.ID, file.proposedname).subscribe(
          () => this.afterSuccess()
        );
      }
    });
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
    this.files.forEach((file: CFile) =>
      file.proposedname = this.initProposal(file))
  }

}
