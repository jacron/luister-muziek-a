import {Component, Input, OnInit} from '@angular/core';
import {Collection} from '../../classes/music/Collection';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-collecties',
  templateUrl: './collecties.component.html',
  styleUrls: ['./collecties.component.scss']
})
export class CollectiesComponent implements OnInit {
  @Input() collections: Collection[];
  @Input() startletter: string;
  imgUrl = environment.apiServer + '/image/';

  imageUrl(id) {
    return `${this.imgUrl}${id}/album/-1/100/`;
  }

  constructor(
  ) { }

  ngOnInit() {
  }

}
