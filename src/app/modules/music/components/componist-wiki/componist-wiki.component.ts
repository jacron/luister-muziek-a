import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-componist-wiki',
  templateUrl: './componist-wiki.component.html',
  styleUrls: ['./componist-wiki.component.scss']
})
export class ComponistWikiComponent implements OnInit {
  @Input() wiki;
  @Output() language = new EventEmitter();
  @Output() picture = new EventEmitter();
  @Output() pictureUrl = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
