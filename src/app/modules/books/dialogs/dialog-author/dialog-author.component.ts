import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Author} from '../../../../classes/book/author';
import {AuthorsComponent} from '../../components/authors/authors.component';

@Component({
  selector: 'app-dialog-author',
  templateUrl: './dialog-author.component.html',
  styleUrls: ['./dialog-author.component.scss']
})
export class DialogAuthorComponent implements OnInit {
  author: Author;
  refresh;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AuthorsComponent>,

  ) { }

  onClose(e) {
    // console.log(e);
    this.dialogRef.close({status: e, author: this.author});
  }

  ngOnInit() {
    this.author = this.data.author;
    this.refresh = '?date=' + new Date();
  }

}
