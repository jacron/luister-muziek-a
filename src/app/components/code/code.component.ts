import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Code} from '../../classes/Code';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchParams} from '../../classes/SearchParams';

@Component({
  selector: 'app-codes',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  codes: Code[];

  constructor(
    private musicService: MusicService,
  ) {
  }

  afterGet(response) {
    this.codes = response;
  }

  ngOnInit() {
    this.musicService.getCodes().subscribe(
      (response) => this.afterGet(response)
    );
  }

}
