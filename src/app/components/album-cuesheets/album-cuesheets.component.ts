import {Component, Input, OnInit} from '@angular/core';
import {Cuesheet} from '../../classes/Cuesheet';
import {MusicService} from '../../services/music.service';
import {Album} from '../../classes/Album';

@Component({
  selector: 'app-album-cuesheets',
  templateUrl: './album-cuesheets.component.html',
  styleUrls: ['./album-cuesheets.component.scss']
})
export class AlbumCuesheetsComponent implements OnInit {

  @Input() cuesheets: Cuesheet[];
  @Input() album: Album;
  @Input() idpiece: number;

  constructor(
    private musicService: MusicService
  ) { }

  getCuesheetById(id) {
    for (let i = 0; i < this.cuesheets.length; i++) {
      if (this.cuesheets[i].ID === id) {
        return this.cuesheets[i];
      }
    }
    return null;
  }

  onPlayed(response, id) {
    // console.log('playing', response);
    const cuesheet = this.getCuesheetById(id);
    cuesheet.played = true;
  }

  play(id) {
    this.musicService.play(id).subscribe(
      (response) => this.onPlayed(response, id)
    );
  }

  update(id, title) {
    this.musicService.updateCuesheetTitle(id, this.album.ID, title).subscribe(
      () => {}
    );
  }

  titleKeydown(e, id, title) {
    if (e.key === 'Enter') {
      this.update(id, title);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.update(id, title);
    }
  }

  ngOnInit() {
    // console.log(this.cuesheets);
  }

}
