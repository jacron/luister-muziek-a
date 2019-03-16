import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../../../classes/book/book';
import {Author} from '../../../../classes/book/author';
import {StateService} from '../../../../services/state.service';
// import {Wiki} from '../../../../classes/book/wiki';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  books: Book[] = [];
  author: Author;
  authorEdit = false;
  wiki;
  refresh = '?';

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private stateService: StateService,
    private toastr: ToastrService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterStoreWiki() {
    this.toastr.success('Wiki afbeelding opgeslagen', 'wiki');
    this.refresh = '?' + new Date();
    this.wiki.imgurl = null;
    // this.wikiImg = null;
  }

  storeWikiPicture(e: string) {
    this.booksService.storeWikiAuthorImg(e, this.author.id).subscribe(
      () => this.afterStoreWiki()
    )
  }

  setWiki(e) {
    this.wiki = e;
  }

  toggleEdit() {
    this.authorEdit= ! this.authorEdit;
  }

  afterGetAuthorBooks(response) {
    this.books = response;
  }

  afterGetAuthor(author: Author) {
    this.author = author;
    document.title = this.author.first + ' ' + this.author.last;
    this.stateService.setTitle(document.title);
  }

  handleParams(params) {
    if (params) {
      const {idauthor} = params;
      if (idauthor) {
        this.booksService.getAuthor(idauthor).subscribe(
          (author: Author) => this.afterGetAuthor(author)
        );
        this.booksService.getAuthorBooks(params.idauthor).subscribe(
          response => this.afterGetAuthorBooks(response)
        );
      }
    }
  }

  ngOnInit() {
  }

}
