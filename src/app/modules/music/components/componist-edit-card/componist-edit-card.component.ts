import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-componist-edit-card',
  templateUrl: './componist-edit-card.component.html',
  styleUrls: ['./componist-edit-card.component.scss']
})
export class ComponistEditCardComponent implements OnInit {
  @Input() composer;
  @Input() refresh;
  @Output() close = new EventEmitter();
  @Output() wiki = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
