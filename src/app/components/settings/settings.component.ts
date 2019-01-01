import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../shared/services/music.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  infos;
  objectKeys = Object.keys;

  constructor(
    private musicService: MusicService
  ) {  }

  afterGetInfos(response) {
    this.infos = response;
  }

  ngOnInit() {
    this.musicService.getInfos().subscribe(
      response => this.afterGetInfos(response)
    );
  }

}
