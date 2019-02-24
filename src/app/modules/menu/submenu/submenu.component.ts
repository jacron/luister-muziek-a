import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {
  @Input() sidenav;
  @Input() links;
  @Input() header;
  menuExpanded = false;
  expandMode = 'expand_more';

  constructor() { }

  toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
    if (this.menuExpanded) {
      this.expandMode = 'expand_less';
    } else {
      this.expandMode = 'expand_more';
    }
  }

  ngOnInit() {
  }

}
