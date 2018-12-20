import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {CuesheetService} from '../../services/cuesheet.service';
import {Cuesheet} from '../../classes/Cuesheet';
import {Person} from '../../classes/Person';
import {MusicService} from '../../services/music.service';
import {Album} from '../../classes/Album';

interface CData {
  cuesheet: Cuesheet;
  album: Album;
}

@Component({
  selector: 'app-dialog-cuesheet-parts',
  templateUrl: './dialog-cuesheet-parts.component.html',
  styleUrls: ['./dialog-cuesheet-parts.component.scss']
})
export class DialogCuesheetPartsComponent implements OnInit {

  stukken: string[];
  performers: string[];
  title: string;
  album: Album;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CData,
    private cuesheetService: CuesheetService,
    private musicService: MusicService
  ) { }

  afterAddPerformer(response: Person) {
    this.musicService.getPerformerById(response.ID).subscribe(
      performer => this.album.album_performers.push(<Person>performer)
    );
  }

  addPerformer(name) {
    this.musicService.newPerformer(name.trim(), this.album.ID).subscribe(
      response => this.afterAddPerformer(<Person>response)
    );
  }

  ngOnInit() {
    const cuesheet = this.data.cuesheet;
    this.stukken = this.cuesheetService.makeStukken(cuesheet);
    this.performers = cuesheet.cue.performers;
    this.title = cuesheet.cue.title;
    this.album = this.data.album;
  }

}
