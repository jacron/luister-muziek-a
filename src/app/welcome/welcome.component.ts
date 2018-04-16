import { Component, OnInit } from '@angular/core';
import {MusicService} from '../services/music.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  infos;
  objectKeys = Object.keys;

  constructor(
    private musicService: MusicService
  ) { }

  afterGetInfos(response) {
    this.infos = response;
  }

  ngOnInit() {
    this.musicService.getInfos().subscribe(
      response => this.afterGetInfos(response)
    );
  }

}
