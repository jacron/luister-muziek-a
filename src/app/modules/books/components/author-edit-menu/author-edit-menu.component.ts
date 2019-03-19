import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-author-edit-menu',
  templateUrl: './author-edit-menu.component.html',
  styleUrls: ['./author-edit-menu.component.scss']
})
export class AuthorEditMenuComponent implements OnInit {
  @Input() author: Author;
  @Output() authorChange = new EventEmitter();
  @Output() close = new EventEmitter();

  options: MenuOption[] = [
    {
      label: 'Google',
      icon: 'search',
      color: 'violet',
      action: this.google.bind(this)
    },
    {
      label: 'Plak afbeelding',
      icon: 'brush',
      color: 'green',
      action: this.pastePicture.bind(this)
    },
    {
      label: 'Verwijderen',
      icon: 'clear',
      color: 'red',
      action: this.remove.bind(this)
    },
  ];

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
  ) { }

  act(f: Function) {
    f();
  }

  afterPastePicture(response) {
    console.log(response);
    this.authorChange.emit(this.author);
    // this.toastr.success('url afbeelding ingeplakt', 'cover');
  }

  pastePicture() {
    this.booksService.pasteAuthorPicture(this.author.id).subscribe(
      response => this.afterPastePicture(response),
      err => this.toastr.error(err)
    )
  }

  google() {
    window.open(environment.googleUrl +
      this.author.first + ' ' + this.author.last);
  }

  afterRemove(id) {
    console.log(id);
    this.close.emit('removed');
  }

  remove() {
    if (confirm('Regisseur verwijderen?')) {
      this.booksService.removeAuthor(this.author.id).subscribe(
        response => this.afterRemove(response)
      )
    }
  }

  ngOnInit() {
  }

}
