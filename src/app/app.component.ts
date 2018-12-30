import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MusicService} from './services/music.service';
import {StateService} from './services/state.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('maindiv') maindiv: ElementRef;

  appTitle = 'music-client';
  title = '';

  links = [
    {
      href: 'search',
      label: 'Zoek',
      icon: 'search'
    },
    {
      href: 'recent',
      label: 'Recent',
      icon: 'access_time'
    },
    {
      href: 'pop',
      label: 'Pop',
      icon: 'person'
    },
    {
      href: 'componist',
      label: 'Componisten',
      icon: 'person'
    },
    {
      href: 'performer',
      label: 'Performers',
      icon: 'person'
    },
    {
      href: 'collectie',
      label: 'Collecties',
      icon: 'all_inbox'
    },
    {
      href: 'tag',
      label: 'Tags',
      icon: 'bookmark'
    },
    {
      href: 'code',
      label: 'Codes',
      icon: 'code'
    },
  ];

  constructor(
    private musicService: MusicService,
    private stateService: StateService,
    private overlayContainer: OverlayContainer
  ) {
  }

  play(cmd) {
    this.musicService.controlPlayer(cmd).subscribe();
  }

  toggleTheme() {
    const altTheme = 'alternate-theme';
    // this.overlayContainer.getContainerElement().classList.add(altTheme);
    this.maindiv.nativeElement.className = altTheme;
  }

  ngOnInit() {
    this.stateService.currentTitle.subscribe(title => this.title = title);
  }
}
