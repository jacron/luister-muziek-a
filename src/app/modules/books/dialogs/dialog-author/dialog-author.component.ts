import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Author} from '../../../../classes/book/author';
import {AuthorsComponent} from '../../components/authors/authors.component';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-author',
  templateUrl: './dialog-author.component.html',
  styleUrls: ['./dialog-author.component.scss']
})
export class DialogAuthorComponent implements OnInit {
  author: Author;
  refresh;
  books = null;
  wiki = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AuthorsComponent>,
    private booksService: BooksService,
    private router: Router,
  ) { }

  onClose(e) {
    // console.log(e);
    this.dialogRef.close({status: e, author: this.author});
  }

  booksCountLabel(n) {
    return n === 1 ? 'boek' : 'boeken';
  }

  toBook(id) {
    this.router.navigate(['books', id]).then(
      () => this.onClose('navigated')
    );
  }

  toggleBooksList() {
    if (this.books) {
      this.books = null;
    } else {
      this.fetchBooks();
    }
  }

  afterFetchBooks(result) {
    console.log(result);
    this.books = result;
  }

  fetchBooks() {
    this.booksService.getAuthorBooks(this.author.id).subscribe(
      result => this.afterFetchBooks(result)
    );
  }

  afterWiki(result) {
    // this.toastr.success('gegevens zijn opeghaald', 'wikipedia');
    if (result && result.image) {
      this.wiki = {
        imgurl: result.image.source,
        description: result.description,
        extract: result.extract
      };
      // this.wiki.emit(this.wikiCache);
    }
  }

  afterStoreWiki() {
    // this.toastr.success('Wiki afbeelding opgeslagen', 'wiki');
    this.refresh = '?' + new Date();
    this.wiki.imgurl = null;
    // this.wikiImg = null;
  }

  storeWikiPicture(e: string) {
    this.booksService.storeWikiAuthorImg(e, this.author.id).subscribe(
      () => this.afterStoreWiki()
    )
  }

  wikipedia(lng) {
    const name = this.author.first + ' ' + this.author.last;
    this.booksService.wikiAuthor(name, lng).subscribe(
      result => this.afterWiki(result)
    )
  }

  changeWiki(e) {
    this.wikipedia(e);
  }

  ngOnInit() {
    this.author = this.data.author;
    this.refresh = '?date=' + new Date();
    // this.fetchBooks();
    this.wikipedia('nl');
  }

}
