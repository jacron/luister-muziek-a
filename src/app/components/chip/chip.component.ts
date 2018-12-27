import {Component, Input, OnInit} from '@angular/core';

/*
            [color]=""
            [removable]="removable"
            [type]="composer"
            [showimage]="showimage"
            [imageUrl]="imgUrl + composer.ID + '/componist/-1/20'"

 */
@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
  @Input() color: string;
  @Input() removable: boolean;
  @Input() type: string;
  @Input() showimage: boolean;
  @Input() imageUrl: string;
  @Input() label: string;

  constructor() { }

  remove() {

  }

  openPic() {

  }

  toItem() {

  }

  ngOnInit() {
  }

}
