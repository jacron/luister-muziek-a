import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Code} from '../../../../classes/music/Code';
import {StateService} from '../../../../services/state.service';

@Component({
  selector: 'app-codes',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  codes: Code[];

  constructor(
    private musicService: MusicService,
    private stateServie: StateService,
  ) {
  }

  afterGet(response) {
    this.codes = response;
    const title = 'Codes (' + this.codes.length + ')';
    this.stateServie.setTitle(title);
  }

  ngOnInit() {
    this.musicService.getCodes().subscribe(
      (response) => this.afterGet(response)
    );
  }

}
