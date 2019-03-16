import {Component, Input, OnInit} from '@angular/core';
import {Director} from '../../../../classes/movies/Director';

@Component({
  selector: 'app-director-films-list',
  templateUrl: './director-films-list.component.html',
  styleUrls: ['./director-films-list.component.scss']
})
export class DirectorFilmsListComponent implements OnInit {
  @Input() director: Director;

  constructor() { }

  ngOnInit() {
  }

}
