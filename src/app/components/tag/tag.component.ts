import { Component, OnInit } from '@angular/core';
import {Tag} from '../../classes/Tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  startletter = '';
  tags: Tag[];

  constructor(
  ) { }

  selectLetter(e) {
    this.startletter = e;
  }

  ngOnInit() {
  }

}
