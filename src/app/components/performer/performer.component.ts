import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Performer} from '../../classes/music/Performer';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.scss']
})
export class PerformerComponent implements OnInit {
  startletter = '';
  performers: Performer[];

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
  ) { }

  selectLetter(e) {
    this.startletter = e;
  }

  afterGetPerformers(response) {
    this.performers = <Performer[]>response;
    const title = 'Performers (' + this.performers.length + ')';
    this.stateService.setTitle(title);
  }

  ngOnInit() {
    this.musicService.getPerformers('startletter').subscribe(
      response => this.afterGetPerformers(response)
    );
  }

}
