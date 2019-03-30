import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {ToastrService} from 'ngx-toastr';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book-remote',
  templateUrl: './book-remote.component.html',
  styleUrls: ['./book-remote.component.scss']
})
export class BookRemoteComponent implements OnInit {
  @Input() book: Book;
  proposal: Book;
  notfound = null;

  constructor(
    private toastr: ToastrService,
    private booksService: BooksService,
  ) { }

  afterGetRemote(response, source) {
    // console.log(response);
    // this.notInCatalogue = true;
    if (response) {
      this.toastr.success('Gegevens zijn opgehaald!', source);
      this.proposal = response;
      this.proposal.id = -1;
      this.proposal.source = source;
      this.notfound = null;
    } else {
      this.toastr.error('Geen gegevens gevonden', source);
      this.notfound = source;
    }
  }

  remote(source) {
    this.toastr.info('haal gegevens op', source);
    this.notfound = null;
    this.proposal = null;
    this.booksService.getRemote(this.book.isbn13, source).subscribe(
      response => this.afterGetRemote(response, source),
      () => this.toastr.error('Geen gegevens gevonden', source)
    )
  }

  ngOnInit() {
  }

}
