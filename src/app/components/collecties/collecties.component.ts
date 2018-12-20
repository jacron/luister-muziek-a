import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Collection} from '../../classes/Collection';

@Component({
  selector: 'app-collecties',
  templateUrl: './collecties.component.html',
  styleUrls: ['./collecties.component.scss']
})
export class CollectiesComponent implements OnInit {
  @Input() label: string;
  @Input() startletter: string;
  collecties: Collection[];

  constructor(
    private musicService: MusicService,
  ) { }

  afterGet(response) {
    this.collecties = <Collection[]>response;
  }

  ngOnInit() {
    this.musicService.getCollections().subscribe(
      response => this.afterGet(response)
    );
  }

}
