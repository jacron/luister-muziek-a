import {Component, Input, OnInit} from '@angular/core';

const videolinks = [
  {
    href: 'videos/klassiek',
    label: 'Video Klassiek',
    icon: 'music',
  },
  {
    href: 'videos/pop',
    label: 'Video Pop',
    icon: 'music'
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
