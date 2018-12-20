import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../classes/Person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  @Input() persons: Person[];
  @Input() startletter: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
