import { Component, OnInit } from '@angular/core';
import {Componist} from '../../classes/Componist';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-componist',
  templateUrl: './componist.component.html',
  styleUrls: ['./componist.component.scss']
})
export class ComponistComponent implements OnInit {

  startletter = '';
  componisten: Componist[];

  constructor(
    private musicService: MusicService,
  ) { }

  selectLetter(e) {
    this.startletter = e;
  }

  afterGetComponisten(response) {
    this.componisten = <Componist[]>response;
  }

  ngOnInit() {
    this.musicService.getComposers('startletter').subscribe(
      response => this.afterGetComponisten(response)
    );
  }

}
