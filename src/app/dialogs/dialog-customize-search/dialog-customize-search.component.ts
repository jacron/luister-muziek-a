import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Choice} from '../../classes/Choice';

@Component({
  selector: 'app-dialog-customize-search',
  templateUrl: './dialog-customize-search.component.html',
  styleUrls: ['./dialog-customize-search.component.scss']
})
export class DialogCustomizeSearchComponent implements OnInit {
  choices: Choice[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogCustomizeSearchComponent>,
  ) { }

  submit(matselection) {
    for (const choice of this.choices) {
      choice.visible = false;
    }
    for (const option of matselection.selectedOptions.selected) {
      // console.log(option.value);
      for (const choice of this.choices) {
        // console.log(choice);
        if (choice.name === option.value) {
          choice.visible = true;
        }
      }
    }
    // console.log(this.choices);
    this.dialogRef.close(this.choices);
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.choices = this.data.choices;
    // this.choices[0].visible = true;  // testing
  }

}
