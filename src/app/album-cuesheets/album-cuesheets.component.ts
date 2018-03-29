import {Component, Input, OnInit} from '@angular/core';
import {Cuesheet} from '../classes/Cuesheet';
import {MusicService} from '../music.service';

@Component({
  selector: 'app-album-cuesheets',
  templateUrl: './album-cuesheets.component.html',
  styleUrls: ['./album-cuesheets.component.scss']
})
export class AlbumCuesheetsComponent implements OnInit {

  @Input('cuesheets') cuesheets: Cuesheet[];
  @Input('albumid') albumid: number;

  constructor(  private musicService: MusicService ) { }

  play(id) {
    this.musicService.play(id).subscribe(
      (response) => console.log(response)
    );
  }

  edit(id, albumid) {
    this.musicService.editCue(id, albumid).subscribe(
      (response) => console.log(response)
    );
  }

  ngOnInit() {
    // console.log(this.cuesheets);
  }

}
