import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-live-weer',
  templateUrl: './live-weer.component.html',
  styleUrls: ['./live-weer.component.scss']
})
export class LiveWeerComponent implements OnInit {
  @Input('lwdata') lwdata;

  constructor() { }

  ngOnInit() {
    // console.log(this.lwdata);
  }

}
