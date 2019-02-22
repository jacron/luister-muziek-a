import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../../../../classes/music/Album';
import {CuesheetService} from '../../services/cuesheet.service';
import {Cuesheet} from '../../../../../classes/music/Cuesheet';
import {Person} from '../../../../../classes/music/Person';
import {MusicService} from '../../../services/music.service';
import {CFile} from '../../../../../classes/music/CFile';
import {UtilService} from '../../../../../services/util.service';

@Component({
  selector: 'app-cuesheet-parts',
  templateUrl: './cuesheet-parts.component.html',
  styleUrls: ['./cuesheet-parts.component.scss']
})
export class CuesheetPartsComponent implements OnInit {
  @Input() album: Album;
  @Input() cuesheet: Cuesheet;
  @Input() idpiece: number;

  tracknames: string[];
  files: CFile[];
  performers: string[];
  title: string;

  constructor(
    private cuesheetService: CuesheetService,
    private musicService: MusicService,
    private util: UtilService,
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

  display(file: CFile) {
    // console.log(file);
    if (file.displayname && file.displayname.length > 0) {
      return file.displayname;
    } else {
      return this.util.stripExtension(file.name);
    }
  }

  onPlayed(file: CFile) {
    file.played = true;
  }

  play(file: CFile) {
    this.musicService.playByName(this.album.ID, file.name).subscribe(
      () => this.onPlayed(file)
    );
  }

  ngOnInit() {
    const stukken = this.cuesheetService.makeStukken(this.cuesheet);
    this.tracknames = stukken.tracknames;
    this.files = stukken.files;
    this.performers = this.cuesheet.cue.performers;
  }

}
