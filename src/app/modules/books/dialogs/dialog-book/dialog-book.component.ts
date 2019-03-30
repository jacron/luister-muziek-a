import {Component, Inject, OnInit} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthorsComponent} from '../../components/authors/authors.component';

@Component({
  selector: 'app-dialog-book',
  templateUrl: './dialog-book.component.html',
  styleUrls: ['./dialog-book.component.scss']
})
export class DialogBookComponent implements OnInit {
  book: Book;
  refresh;
  wiki = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AuthorsComponent>,

  ) { }

  onClose(e) {
    this.dialogRef.close({status: e, author: this.book});
  }

  ngOnInit() {
    this.book = this.data.book;
    this.refresh = '?date=' + new Date();
  }

}
