import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-book-wiki',
  templateUrl: './book-wiki.component.html',
  styleUrls: ['./book-wiki.component.scss']
})
export class BookWikiComponent implements OnInit {
  @Input() wiki;
  @Input() showActions = true;
  @Output() picture = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() language = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
