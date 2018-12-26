import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../classes/Album';
import {CuesheetService} from '../../services/cuesheet.service';
import {Cuesheet} from '../../classes/Cuesheet';
import {Person} from '../../classes/Person';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-cuesheet-parts',
  templateUrl: './cuesheet-parts.component.html',
  styleUrls: ['./cuesheet-parts.component.scss']
})
export class CuesheetPartsComponent implements OnInit {
  @Input() album: Album;
  @Input() cuesheet: Cuesheet;
  @Output() titleChange: EventEmitter<any> = new EventEmitter<any>();

  stukken: string[];
  performers: string[];
  title: string;

  constructor(
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

  changeTitle(data) {
    this.titleChange.emit(data);
  }

  ngOnInit() {
    this.stukken = this.cuesheetService.makeStukken(this.cuesheet);
    this.performers = this.cuesheet.cue.performers;
  }

}
