import {Component, Input, OnInit} from '@angular/core';
import {MenuOption} from '../../../classes/shared/MenuOption';

const movielinks: MenuOption[] = [
  {
    href: 'movies',
    label: 'Films',
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
