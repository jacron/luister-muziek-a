import {Component, Inject, OnInit} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthorsComponent} from '../../components/authors/authors.component';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';

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
    private booksService: BooksService,
    private toastr: ToastrService,

  ) { }

  onClose(e) {
    this.dialogRef.close({status: e, author: this.book});
  }

  onLanguage(lng) {
    this.wikipedia(lng);
  }

  afterStoreWikiPicture() {
    // this.toastr.success('Wiki afbeelding opgeslagen', 'wiki');
    this.refresh = '?' + new Date();
    this.wiki.imgurl = null;
  }

  storeWikiPicture(e: string) {
    this.booksService.storeWikiAuthorImg(e, this.book.id).subscribe(
      () => this.afterStoreWikiPicture()
    )
  }

  afterWikipedia(result) {
    // console.log(result);
    if (result) {
      this.wiki = result;
      if (result.image) {
        this.wiki.imgurl = result.image.source
      }
    }
  }

  wikipedia(lng) {
    const name = this.book.title;
    this.booksService.wikiAuthor(name, lng).subscribe(
      result => this.afterWikipedia(result),
      () => this.toastr.error('Geen wiki-gegevens voor taal: ' + lng)
    )
  }

  changeWiki(e) {
    this.wikipedia(e);
  }

  ngOnInit() {
    this.book = this.data.book;
    this.refresh = '?date=' + new Date();
    this.wikipedia('nl');
  }

}
