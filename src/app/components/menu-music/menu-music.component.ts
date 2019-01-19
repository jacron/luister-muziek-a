import {Component, Input, OnInit} from '@angular/core';

const musiclinks = [
  {
    href: 'home',
    label: 'Home',
    icon: 'search',
    color: 'orange',
  },
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
    icon: 'person',
    color: '#66ffdd',
  },
  {
    href: 'composer',
    label: 'Componisten',
    icon: 'person',
    color: '#ff6688',
  },
  {
    href: 'performer',
    label: 'Performers',
    icon: 'person'
  },
  {
    href: 'collection',
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

@Component({
  selector: 'app-menu-music',
  templateUrl: './menu-music.component.html',
  styleUrls: ['./menu-music.component.scss']
})
export class MenuMusicComponent implements OnInit {
  musiclinks;
  @Input() sidenav;

  constructor() { }

  ngOnInit() {
    this.musiclinks = musiclinks;
  }

}
