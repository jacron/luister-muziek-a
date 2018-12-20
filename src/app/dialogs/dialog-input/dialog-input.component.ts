import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-input',
  templateUrl: './dialog-input.component.html',
  styleUrls: ['./dialog-input.component.scss']
})
export class DialogInputComponent implements OnInit {

  prompt: string;
  str: string;

  constructor(
    private dialogRef: MatDialogRef<DialogInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  submit() {
    console.log(this.str);
    this.dialogRef.close(this.str);
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.prompt = this.data.prompt;
    this.str = '';
  }

}
