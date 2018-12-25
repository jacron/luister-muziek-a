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
      label: 'Zoek'
    },
    {
      href: 'recent',
      label: 'Actueel'
    },
    {
      href: 'componist',
      label: 'Componist'
    },
    {
      href: 'performer',
      label: 'Artiest'
    },
    {
      href: 'collectie',
      label: 'Collectie'
    },
    {
      href: 'tag',
      label: 'Tag'
    },
    {
      href: 'code',
      label: 'Code'
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
