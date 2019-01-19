import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTitle = 'media-client';
  darkOn = false;

  setDarkOn(e) {
    this.darkOn = e;
  }

  constructor(
  ) {}

  ngOnInit() {
    // this.debugMessage = 'debug message comes here';
  }
}
