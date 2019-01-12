import {Component, Input, OnInit} from '@angular/core';

const movielinks = [
  {
    href: 'movies',
    label: 'Movies',
    icon: 'movie'
  },
];

@Component({
  selector: 'app-menu-movies',
  templateUrl: './menu-movies.component.html',
  styleUrls: ['./menu-movies.component.scss']
})
export class MenuMoviesComponent implements OnInit {
  @Input() sidenav;
  movielinks;

  constructor() { }

  ngOnInit() {
    this.movielinks = movielinks;
  }

}
