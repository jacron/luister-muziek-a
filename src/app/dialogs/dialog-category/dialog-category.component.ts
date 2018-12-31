import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FacetService} from '../../services/facet.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {
  options = [
    {
      name: 'Componist',
      value: 'composer',
    },
    {
      name: 'Performer',
      value: 'performer',
    }
  ];
  categoryControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<FacetService>,

  ) { }

  submit() {
    this.dialogRef.close(this.categoryControl.value);
  }

  ngOnInit() {
  }

}
