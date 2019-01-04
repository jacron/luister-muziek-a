import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {
  @Input() director;

  constructor(
    private domSanatizer: DomSanitizer,
  ) { }

  getBackgroundImageUrl() {
    const imageUrl = this.director.ImageUrl;
    const sanatizedUrl = this.domSanatizer.bypassSecurityTrustResourceUrl(imageUrl);
    // const url = `url('${sanatizedUrl}')`;
    return sanatizedUrl;
  }

  ngOnInit() {
  }

}
