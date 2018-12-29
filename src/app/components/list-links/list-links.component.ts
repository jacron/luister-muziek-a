import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from '../../classes/List';

@Component({
  selector: 'app-list-links',
  templateUrl: './list-links.component.html',
  styleUrls: ['./list-links.component.scss']
})
export class ListLinksComponent implements OnInit {
  @Input() list: List;
  @Output() close = new EventEmitter();

  constructor() { }

  doClose() {
    this.close.emit();
  }

  ngOnInit() {
  }

}
