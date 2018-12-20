import {Component, Input, OnInit} from '@angular/core';
import {Tag} from '../../classes/Tag';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() label;
  @Input() startletter;
  tags: Tag[];

  constructor(
    private musicService: MusicService,

  ) { }

  afterGet(response) {
    // console.log(response);
    this.tags = <Tag[]>response;
  }

  ngOnInit() {
    this.musicService.getTags().subscribe(
      response => this.afterGet(response)
    );
  }

}
