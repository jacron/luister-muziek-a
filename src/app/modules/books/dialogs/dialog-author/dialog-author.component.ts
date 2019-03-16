import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Author} from '../../../../classes/book/author';
import {AuthorsComponent} from '../../components/authors/authors.component';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-author',
  templateUrl: './dialog-author.component.html',
  styleUrls: ['./dialog-author.component.scss']
})
export class DialogAuthorComponent implements OnInit {
  author: Author;
  refresh;
  wiki = null;
  showBooks = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AuthorsComponent>,
    private booksService: BooksService,
    private toastr: ToastrService,
  ) { }

  onClose(e) {
    // console.log(e);
    this.dialogRef.close({status: e, author: this.author});
  }

  toggleBooksList() {
    this.showBooks = !this.showBooks;
  }

  onLanguage(lng) {
    this.wikipedia(lng);
  }

  afterStoreWiki() {
    // this.toastr.success('Wiki afbeelding opgeslagen', 'wiki');
    this.refresh = '?' + new Date();
    this.wiki.imgurl = null;
  }

  storeWikiPicture(e: string) {
    this.booksService.storeWikiAuthorImg(e, this.author.id).subscribe(
      () => this.afterStoreWiki()
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
    const name = this.author.first + ' ' + this.author.last;
    this.booksService.wikiAuthor(name, lng).subscribe(
      result => this.afterWikipedia(result),
      () => this.toastr.error('Geen wiki-gegevens voor taal: ' + lng)
    )
  }

  changeWiki(e) {
    this.wikipedia(e);
  }

  ngOnInit() {
    this.author = this.data.author;
    this.refresh = '?date=' + new Date();
    this.wikipedia('nl');
  }

}
