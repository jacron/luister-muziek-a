import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../classes/Person';

@Component({
  selector: 'app-album-persons',
  templateUrl: './album-persons.component.html',
  styleUrls: ['./album-persons.component.scss']
})
export class AlbumPersonsComponent implements OnInit {

  @Input('persons') persons: Person[];
  constructor() { }

  ngOnInit() {
  }

}
