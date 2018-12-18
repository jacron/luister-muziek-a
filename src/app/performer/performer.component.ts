import { Component, OnInit } from '@angular/core';
import {MusicService} from '../services/music.service';
import {Performer} from '../classes/Performer';

@Component({
  selector: 'app-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.scss']
})
export class PerformerComponent implements OnInit {
  performers: Performer[];

  constructor(
    private musicService: MusicService,
  ) { }

  afterGet(response) {
    this.performers = response;
  }

  ngOnInit() {
    this.musicService.getPerformers().subscribe(
      (response) => this.afterGet(response)
    );
  }

}
