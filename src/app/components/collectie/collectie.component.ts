import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collectie',
  templateUrl: './collectie.component.html',
  styleUrls: ['./collectie.component.scss']
})
export class CollectieComponent implements OnInit {
  startletter: string;

  constructor(
  ) { }

  selectLetter(e) {
    // console.log(e);
    this.startletter = e;
  }

  ngOnInit() {
  }

}
