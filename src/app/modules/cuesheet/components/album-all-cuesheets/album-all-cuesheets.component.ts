import {Component, Input, OnInit} from '@angular/core';
import {Cuesheet} from '../../../../classes/Cuesheet';
import {Album} from '../../../../classes/Album';

@Component({
  selector: 'app-album-all-cuesheets',
  templateUrl: './album-all-cuesheets.component.html',
  styleUrls: ['./album-all-cuesheets.component.scss']
})
export class AlbumAllCuesheetsComponent implements OnInit {

  @Input() album: Album;
  @Input() idpiece;

  invalidCuesheets: Cuesheet[];
  validCuesheets: Cuesheet[];

  constructor() { }

  getCuesheets() {
    this.invalidCuesheets = [];
    this.validCuesheets = [];
    this.album.cuesheets.forEach(cuesheet => {
      if (cuesheet.Invalid) {
        this.invalidCuesheets.push(cuesheet);
      } else {
        this.validCuesheets.push(cuesheet);
      }
    });
  }

  ngOnInit() {
    this.getCuesheets();
  }

}
