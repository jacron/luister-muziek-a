import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  servers = {};

  constructor() { }

  ngOnInit() {
    this.servers = {
      music: environment.musicServer,
      movie: environment.moviesServer,
      book: environment.booksServer
    };

  }

}
