import {Component, Input, OnInit} from '@angular/core';
import {Cuesheet} from '../../classes/Cuesheet';
import {MusicService} from '../../services/music.service';
import {environment} from '../../../environments/environment';
import {Album} from '../../classes/Album';
import {Person} from '../../classes/Person';

@Component({
  selector: 'app-album-cuesheets',
  templateUrl: './album-cuesheets.component.html',
  styleUrls: ['./album-cuesheets.component.scss']
})
export class AlbumCuesheetsComponent implements OnInit {

  @Input('cuesheets') cuesheets: Cuesheet[];
  @Input('album') album: Album;
  freedbUrl = environment.freedbUrl;
  musicbrainzUrl = environment.musicbrainz;
  amazonUrl = environment.amazonUrl;

  constructor(  private musicService: MusicService ) { }

  getCuesheetById(id) {
    for (let i = 0; i < this.cuesheets.length; i++) {
      if (this.cuesheets[i].ID === id) {
        return this.cuesheets[i];
      }
    }
    return null;
  }

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

  update(id, title) {
    this.musicService.updateCuesheetTitle(id, this.album.ID, title).subscribe(
      (response) => console.log(response)
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
