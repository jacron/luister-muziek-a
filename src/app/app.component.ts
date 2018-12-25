import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MusicService} from './services/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Luister Muziek A';
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
  ) {
  }

  play(cmd) {
    this.musicService.controlPlayer(cmd).subscribe();
  }

  search() {
    console.log('search');
  }
}
