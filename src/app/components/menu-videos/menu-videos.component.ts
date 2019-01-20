import {Component, Input, OnInit} from '@angular/core';

const videolinks = [
  {
    href: 'videos/klassiek',
    label: 'Video Klassiek',
    icon: 'movie',
    color: '#ff6666',
  },
  {
    href: 'videos/pop',
    label: 'Video Pop',
    icon: 'movie',
    color: '#66ffdd'
  },
  {
    href: 'videos/documentaire',
    label: 'Documentaire',
    icon: 'movie',
    color: '#66ddff',
  }
];

@Component({
  selector: 'app-menu-videos',
  templateUrl: './menu-videos.component.html',
  styleUrls: ['./menu-videos.component.scss']
})
export class MenuVideosComponent implements OnInit {
  @Input() sidenav;
  videolinks;

  constructor() { }

  ngOnInit() {
    this.videolinks = videolinks;
  }

}
