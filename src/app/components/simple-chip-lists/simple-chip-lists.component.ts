import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../classes/Album';

@Component({
  selector: 'app-simple-chip-lists',
  templateUrl: './simple-chip-lists.component.html',
  styleUrls: ['./simple-chip-lists.component.scss']
})
export class SimpleChipListsComponent implements OnInit {
  @Input() album: Album;

  constructor() { }

  ngOnInit() {
  }

}
