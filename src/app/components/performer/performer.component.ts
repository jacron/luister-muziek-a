import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Performer} from '../../classes/Performer';

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
  ) { }

  selectLetter(e) {
    this.startletter = e;
  }

  afterGetPerformers(response) {
    this.performers = <Performer[]>response;
  }

  ngOnInit() {
    this.musicService.getPerformers('startletter').subscribe(
      response => this.afterGetPerformers(response)
    );
  }

}
