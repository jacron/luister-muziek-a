import {Component, Input, OnInit} from '@angular/core';
import {Cuesheet} from '../../classes/Cuesheet';
import {MusicService} from '../../services/music.service';
import {Album} from '../../classes/Album';
import {MatDialog} from '@angular/material';
import {DialogCuesheetPartsComponent} from '../../dialogs/dialog-cuesheet-parts/dialog-cuesheet-parts.component';

@Component({
  selector: 'app-cuesheet-menu',
  templateUrl: './cuesheet-menu.component.html',
  styleUrls: ['./cuesheet-menu.component.scss']
})
export class CuesheetMenuComponent implements OnInit {

  @Input() cuesheet: Cuesheet;
  @Input() album: Album;

  constructor(
    private musicService: MusicService,
    private dialog: MatDialog,
  ) { }

  edit(id) {
    this.musicService.editCue(id, this.album.ID).subscribe(
      () => {},
      (error) => console.error(error)
    );
  }

  showParts(cue) {
    this.dialog.open(DialogCuesheetPartsComponent, {
      data: {
        cuesheet: cue,
        album: this.album,
      }
    });
  }

  // nameToFilename(cuesheet: Cuesheet) {
  //   this.musicService.nameCueToFilename(cuesheet.ID, this.album.ID,
  //     cuesheet.Title).subscribe(
  //       response => console.log(response)
  //   );
  // }

  // nameFromFilename(cuesheet) {
  //   this.musicService.nameCueFromFilename(cuesheet.ID, this.album.ID).subscribe(
  //     (response) => cuesheet.Title = response
  //   );
  // }

  afterDelete() {
    this.musicService.refetch(this.album.ID).subscribe(
      (album: Album) => this.album.cuesheets = album.cuesheets
    );
  }

  delete(cuesheet: Cuesheet) {
    if (confirm('delete "' + cuesheet.Title + '"?')) {
      this.musicService.deleteCue(cuesheet.ID, this.album.ID)
        .subscribe(() => this.afterDelete()
        );
    }
  }

  ngOnInit() {
  }

}
