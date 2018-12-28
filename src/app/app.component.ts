import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MusicService} from './services/music.service';
import {StateService} from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  appTitle = 'music-client';
  title: string;
  opened: boolean;

  links = [
    {
      href: 'search',
      label: 'Zoek',
      icon: 'search'
    },
    {
      href: 'recent',
      label: 'Actueel',
      icon: 'access_time'
    },
    {
      href: 'componist',
      label: 'Componist',
      icon: 'person'
    },
    {
      href: 'performer',
      label: 'Artiest',
      icon: 'person'
    },
    {
      href: 'collectie',
      label: 'Collectie',
      icon: 'all_inbox'
    },
    {
      href: 'tag',
      label: 'Tag',
      icon: 'bookmark'
    },
    {
      href: 'code',
      label: 'Code',
      icon: 'code'
    },
  ];

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
  ) {
  }

  play(cmd) {
    this.musicService.controlPlayer(cmd).subscribe();
  }

  search() {
    console.log('search');
  }

  setTitle(title) {
    this.title = title;
  }

  ngOnInit() {
    this.stateService.currentTitle.subscribe(title => this.setTitle(title));
  }
}
