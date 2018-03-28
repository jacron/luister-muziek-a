import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  imgUrl = environment.apiServer + '/image/';

  @Input('album') album: Album;

  constructor() { }

  ngOnInit() {
  }

}
