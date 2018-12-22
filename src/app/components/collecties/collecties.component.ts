import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Collection} from '../../classes/Collection';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-collecties',
  templateUrl: './collecties.component.html',
  styleUrls: ['./collecties.component.scss']
})
export class CollectiesComponent implements OnInit {
  @Input() label: string;
  @Input() startletter: string;
  collecties: Collection[];
  imgUrl = environment.apiServer + '/image/';

  constructor(
    private musicService: MusicService,
    private router: Router
  ) { }

  toSearch(id) {
    this.router.navigate(['/search',
      {
        idcoll: id,
      }
    ]).then();
  }

  afterGet(response) {
    this.collecties = <Collection[]>response;
  }

  ngOnInit() {
    this.musicService.getCollections().subscribe(
      response => this.afterGet(response)
    );
  }

}
