import {Component, Input, OnInit} from '@angular/core';
import {Cuesheet} from '../../../classes/Cuesheet';
import {MusicService} from '../../../services/music.service';
import {Album} from '../../../classes/Album';

@Component({
  selector: 'app-album-cuesheets',
  templateUrl: './album-cuesheets.component.html',
  styleUrls: ['./album-cuesheets.component.scss']
})
export class AlbumCuesheetsComponent implements OnInit {

  @Input() cuesheets: Cuesheet[];
  @Input() album: Album;
  @Input() idpiece: number;
  @Input() playable: boolean;

  constructor(
    private musicService: MusicService
  ) { }

  // titleChange(data) {
  //   const {id, title} = data;
  //   const cuesheet = this.getCuesheetById(id, this.cuesheets);
  //   cuesheet.Title = title;
  // }

  getCuesheetById(id: number, cuesheets: Cuesheet[]): Cuesheet | null {
    for (let i = 0; i < cuesheets.length; i++) {
      if (cuesheets[i].ID === id) {
        return cuesheets[i];
      }
    }
    return null;
  }

  onPlayed(response, id) {
    const cuesheet = this.getCuesheetById(id, this.cuesheets);
    cuesheet.played = true;
  }

  play(e, id) {
    // console.log(e);
    e.stopPropagation();
    if (this.playable) {
      this.musicService.play(id).subscribe(
        response => this.onPlayed(response, id)
      );
    } else {
      alert('Dit stuk is niet af te spelen (bestand niet gevonden)');
    }
  }

  ngOnInit() {
  }

}
