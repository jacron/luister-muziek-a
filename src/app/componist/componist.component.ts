import { Component, OnInit } from '@angular/core';
import {MusicService} from '../services/music.service';
import {Componist} from '../classes/Componist';

@Component({
  selector: 'app-componist',
  templateUrl: './componist.component.html',
  styleUrls: ['./componist.component.scss']
})
export class ComponistComponent implements OnInit {
  componisten: Componist[];

  constructor(
    private musicService: MusicService,
  ) { }

  afterGet(response) {
    this.componisten = response;
  }

  ngOnInit() {
    this.musicService.getComposers().subscribe(
      (response) => this.afterGet(response)
    );
  }

}
