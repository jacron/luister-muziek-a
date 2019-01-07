import { Component, OnInit } from '@angular/core';
import {StateService} from '../../../../services/state.service';

@Component({
  selector: 'app-movies-start',
  templateUrl: './movies-start.component.html',
  styleUrls: ['./movies-start.component.scss']
})
export class MoviesStartComponent implements OnInit {

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.stateService.setTitle('Movies');
  }

}
