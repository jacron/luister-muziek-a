import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-cuesheet-parts',
  templateUrl: './dialog-cuesheet-parts.component.html',
  styleUrls: ['./dialog-cuesheet-parts.component.scss']
})
export class DialogCuesheetPartsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
