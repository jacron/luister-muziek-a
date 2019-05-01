import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {ToastrService} from 'ngx-toastr';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book-proposal',
  templateUrl: './book-proposal.component.html',
  styleUrls: ['./book-proposal.component.scss']
})
export class BookProposalComponent implements OnInit {
  @Input() isbn: string;
  proposal: Book;
  notfound = null;

  constructor(
    private toastr: ToastrService,
    private booksService: BooksService,
  ) { }

  afterGetRemote(response, source) {
    this.toastr.success('Gegevens zijn opgehaald!', source);
    if (response) {
      this.proposal = response;
      this.proposal.id = -1;
      this.proposal.source = source;
      this.notfound = null;
    } else {
      this.notfound = source;
    }
  }

  remote(source) {
    this.toastr.info('haal gegevens op', source);
    this.notfound = null;
    this.proposal = null;
    this.booksService.getRemote(this.isbn, source).subscribe(
      response => this.afterGetRemote(response, source)
    )
  }

  newbook() {
    this.proposal = {
      isbn: this.isbn,
      id: -1,
      source: null,
      title: '',
      genre: '',
      subtitle: '',
      isbn13: '',
      imgurl: '',
      notes: '',
      pubinfo: '',
      author: '',
      author_id: -1,
      tags: '',
      date: '',
      translator: '',
      original_title: ''
    };
    this.notfound = null;
  }

  ngOnInit() {
  }

}
