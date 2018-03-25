import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../classes/Album';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-album-thumb',
  templateUrl: './album-thumb.component.html',
  styleUrls: ['./album-thumb.component.scss']
})
export class AlbumThumbComponent implements OnInit {

  imgUrl = environment.apiServer + '/image/';

  @Input('album') album: Album;
  constructor() {
  }

  ngOnInit() {
  }

}
