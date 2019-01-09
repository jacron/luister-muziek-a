import { Component, OnInit } from '@angular/core';
import {Componist} from '../../classes/music/Componist';
import {MusicService} from '../../services/music.service';
import {StateService} from '../../services/state.service';

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
    private stateService: StateService,
  ) { }

  selectLetter(e) {
    this.startletter = e;
  }

  afterGetComponisten(response) {
    this.componisten = <Componist[]>response;
    const title = 'Componisten (' + this.componisten.length + ')';
    this.stateService.setTitle(title);
  }

  ngOnInit() {
    this.musicService.getComposers('startletter').subscribe(
      response => this.afterGetComponisten(response)
    );
  }

}
