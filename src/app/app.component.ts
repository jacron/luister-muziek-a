import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MusicService} from './services/music.service';
import {StateService} from './services/state.service';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  appTitle = 'music-client';
  title: string;

  // private _mobileQueryListener: () => void;

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
    // changeDetectorRef: ChangeDetectorRef,
    // media: MediaMatcher,
    private musicService: MusicService,
    private stateService: StateService,
  ) {
    // this.mobileQuery = media.matchMedia('(max-width: 600px');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this._mobileQueryListener);
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

  ngOnDestroy() {
    // this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.stateService.currentTitle.subscribe(title => this.setTitle(title));
  }
}
