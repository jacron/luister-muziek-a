import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Collection} from '../../classes/music/Collection';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-collectie',
  templateUrl: './collectie.component.html',
  styleUrls: ['./collectie.component.scss']
})
export class CollectieComponent implements OnInit {
  startletter = '';
  collecties: Collection[];

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
  ) { }

  selectLetter(e) {
    this.startletter = e;
  }

  afterGet(response) {
    this.collecties = <Collection[]>response;
    const title = 'Collecties (' + this.collecties.length + ')';
    this.stateService.setTitle(title);
  }

  ngOnInit() {
    this.musicService.getCollections().subscribe(
      response => this.afterGet(response)
    );
  }

}
