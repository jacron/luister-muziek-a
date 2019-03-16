import {Component, Input, OnInit} from '@angular/core';
import {MenuOption} from '../../../classes/shared/MenuOption';

const booklinks: MenuOption[] = [
  {
    href: 'books',
    label: 'Boeken',
    icon: 'book'
  },
  {
    href: 'authors',
    label: 'Auteurs',
    icon: 'person',
    color: 'blue'
  }
];

@Component({
  selector: 'app-menu-books',
  templateUrl: './menu-books.component.html',
  styleUrls: ['./menu-books.component.scss']
})
export class MenuBooksComponent implements OnInit {
  @Input() sidenav;
  booklinks;

  constructor() { }

  ngOnInit() {
    this.booklinks = booklinks;
  }

}
