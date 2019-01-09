import {Component, Input, OnInit} from '@angular/core';
import {Tag} from '../../classes/music/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() tags: Tag[];
  @Input() startletter;

  constructor(
  ) { }

  ngOnInit() {
  }

}
