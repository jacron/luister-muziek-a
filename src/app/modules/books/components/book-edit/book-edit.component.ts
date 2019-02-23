import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../../classes/book/book';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnChanges {
  @Input() book: Book;
  @Output() bookChange = new EventEmitter();

  formGroup: FormGroup;

  constructor(
    private booksService: BooksService,
  ) { }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.book) {
      this.initForm();
    }
  }

  afterSave(id, book: Book) {
    this.book = book;
    this.bookChange.emit(book);
  }

  save() {
    const b: Book = this.formGroup.value;

    const book: Book = {
      id: this.book.id,
      title: b.title,
      subtitle: b.subtitle,
      imgurl: b.imgurl,
      notes: b.notes,
      pubinfo: b.pubinfo,
      author: b.author,
      author_id: b.author_id,
      isbn: b.isbn,
      isbn13: b.isbn13,
      tags: b.tags,
      genre: b.genre,
      date: b.date,
      translator: b.translator,
      original_title: b.original_title,
    };
    this.booksService.saveBook(book).subscribe(
      response => this.afterSave(response, book)
    )
  }

  initForm() {
    this.formGroup = new FormGroup({
      title: new FormControl(this.book.title, [
        Validators.required,
      ]),
      subtitle: new FormControl(this.book.subtitle),
      imgurl: new FormControl(this.book.imgurl),
      notes: new FormControl(this.book.notes),
      pubinfo: new FormControl(this.book.pubinfo),
      author: new FormControl(this.book.author),
      author_id: new FormControl(this.book.author_id),
      isbn: new FormControl(this.book.isbn),
      isbn13: new FormControl(this.book.isbn13),
      tags: new FormControl(this.book.tags),
      genre: new FormControl(this.book.genre),
      date: new FormControl(this.book.date),
      translator: new FormControl(this.book.translator),
      original_title: new FormControl(this.book.original_title),
    })
  }

  ngOnInit() {
    this.initForm();
  }

}
