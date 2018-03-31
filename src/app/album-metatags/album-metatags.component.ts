import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-album-metatags',
  templateUrl: './album-metatags.component.html',
  styleUrls: ['./album-metatags.component.scss']
})
export class AlbumMetatagsComponent implements OnInit {

  @Input('tags') tags: any;
  objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
  }

}
