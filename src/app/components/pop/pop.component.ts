import { Component, OnInit } from '@angular/core';
import {StateService} from '../../services/state.service';
import {Person} from '../../classes/Person';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {

  performers: Person[];

  constructor(
    private stateService: StateService,
    private musicService: MusicService,
  ) { }

  afterGet(response) {
    this.performers = response;
  }

  ngOnInit() {
    this.stateService.setTitle('Pop');
    this.musicService.getPerformersGenre('pop')
      .subscribe(response => this.afterGet(response));
  }

}
