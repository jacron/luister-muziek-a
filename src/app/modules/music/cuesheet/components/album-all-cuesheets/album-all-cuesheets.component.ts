import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Cuesheet} from '../../../../../classes/music/Cuesheet';
import {Album} from '../../../../../classes/music/Album';

@Component({
  selector: 'app-album-all-cuesheets',
  templateUrl: './album-all-cuesheets.component.html',
  styleUrls: ['./album-all-cuesheets.component.scss']
})
export class AlbumAllCuesheetsComponent implements OnInit, OnChanges {

  @Input() album: Album;
  @Input() idpiece;

  invalidCuesheets: Cuesheet[];
  validCuesheets: Cuesheet[];

  constructor() { }

  getCuesheets() {
    this.invalidCuesheets = [];
    this.validCuesheets = [];
    this.album.cuesheets.forEach(cuesheet => {
      if (cuesheet.invalid) {
        this.invalidCuesheets.push(cuesheet);
      } else {
        this.validCuesheets.push(cuesheet);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.album) {
      this.getCuesheets();
    }
  }

  ngOnInit() {
    this.getCuesheets();
  }

}
