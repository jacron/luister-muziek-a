import { Component, OnInit } from '@angular/core';
import {MusicService} from '../services/music.service';
import {Code} from '../classes/Code';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnInit {

  codes: Code[];

  constructor(
    private musicService: MusicService
  ) { }

  afterGet(response) {
    this.codes = response;
  }

  ngOnInit() {
    this.musicService.getCodes().subscribe(
      (response) => this.afterGet(response)
    );
  }

}
