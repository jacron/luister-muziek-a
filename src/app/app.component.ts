import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MusicService} from './services/music.service';
import {StateService} from './services/state.service';
import {OverlayContainer} from '@angular/cdk/overlay';

const darkKey = 'mzkDarkKey';
const altTheme = 'alternate-theme';
const localStorage = window.localStorage;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('maindiv') maindiv: ElementRef;

  appTitle = 'media-client';
  title = 'media-client';
  alternated = false;

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
    private overlayContainer: OverlayContainer
  ) {}

  play(cmd) {
    this.musicService.controlPlayer(cmd).subscribe();
  }

  setTheme(mode) {
    switch(mode) {
      case 'on':
        this.overlayContainer.getContainerElement().classList.add(altTheme);
        this.maindiv.nativeElement.className = altTheme;
        document.querySelector('html').className = altTheme;
        break;
      case 'off':
        this.overlayContainer.getContainerElement().classList.remove(altTheme);
        this.maindiv.nativeElement.className = '';
        document.querySelector('html').className = '';
        break;
    }
  }

  toggleTheme() {
    if (this.alternated) {
      this.setTheme('off');
      this.alternated = false;
      localStorage.setItem(darkKey, 'off');
    } else {
      this.setTheme('on');
      this.alternated = true;
      localStorage.setItem(darkKey, 'on');
    }
  }

  ngOnInit() {
    // this.debugMessage = 'debug message comes here';
    this.title = 'media-client';
    this.stateService.currentTitle.subscribe(title => this.title = title);
    if (localStorage.getItem(darkKey) == 'on') {
      this.alternated = true;
      this.setTheme('on');
    }
  }
}
