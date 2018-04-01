import {Component, Input, OnInit} from '@angular/core';
import {Cuesheet} from '../classes/Cuesheet';
import {MusicService} from '../music.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-album-cuesheets',
  templateUrl: './album-cuesheets.component.html',
  styleUrls: ['./album-cuesheets.component.scss']
})
export class AlbumCuesheetsComponent implements OnInit {

  @Input('cuesheets') cuesheets: Cuesheet[];
  @Input('albumid') albumid: number;
  renaming = environment.renamingCuesheet;

  constructor(  private musicService: MusicService ) { }

  getCuesheetById(id) {
    for (let i = 0; i < this.cuesheets.length; i++) {
      if (this.cuesheets[i].ID === id) {
        return this.cuesheets[i];
      }
    }
    return null;
  }

  onPlayed(response, id) {
    console.log(response);
    const cuesheet = this.getCuesheetById(id);
    cuesheet.played = true;
  }

  play(id) {
    this.musicService.play(id).subscribe(
      (response) => this.onPlayed(response, id)
    );
  }

  edit(id) {
    this.musicService.editCue(id, this.albumid).subscribe(
      (response) => console.log(response)
    );
  }

  rename(cuesheet) {
    this.musicService.renameCue(cuesheet.ID, this.albumid).subscribe(
      (response) => cuesheet.Title = response
    );
  }

  titleKeydown(e, id, title) {
    if (e.key === 'Enter') {
      this.musicService.updateCuesheetTitle(id, this.albumid, title).subscribe(
        (response) => console.log(response)
      );
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.musicService.updateCuesheetTitle(id, this.albumid, title).subscribe(
        (response) => console.log(response)
      );
    }
  }

  ngOnInit() {
    console.log(this.cuesheets);
  }

}
