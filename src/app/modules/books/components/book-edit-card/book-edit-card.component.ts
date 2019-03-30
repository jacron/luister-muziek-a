import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormOption} from '../../../../classes/shared/FormOption';
import {environment} from '../../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Book} from '../../../../classes/book/book';
import {BooksService} from '../../services/books.service';
import {FormEditService} from '../../../../services/form-edit.service';
import {FormError} from '../../../../classes/shared/FormError';

@Component({
  selector: 'app-book-edit-card',
  templateUrl: './book-edit-card.component.html',
  styleUrls: ['./book-edit-card.component.scss']
})
export class BookEditCardComponent implements OnInit, OnChanges {
  @Input() book: Book;
  @Input() refresh: string;
  @Output() close = new EventEmitter();
  @Output() bookChange = new EventEmitter();
  @Output() toggleFilmsList = new EventEmitter();
  @Output() wiki = new EventEmitter();
  formGroup: FormGroup;
  viewUrl = environment.moviesServer + '/image/book/';
  options: FormOption[] = [
    {
      name: 'title',
      label: 'Titel',
      validators: [Validators.required],
    },
    {
      name: 'subtitle',
      label: 'Ondertitel',
    },
    {
      name: 'isbn',
      label: 'isbn',
    },
    {
      name: 'isbn13',
      label: 'isbn13',
    },
    {
      name: 'author',
      label: 'Auteur',
    },
    {
      name: 'author_id',
      label: 'Auteur id'
    },
    {
      name: 'imgurl',
      label: 'afbeeldingspad'
    },
  ];
  errors: FormError[] = [
    {
      name: 'title',
      validator: 'required',
      message: 'Dit veld is verplicht'
    }
  ];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private booksService: BooksService,
    private formEditService: FormEditService,
  ) { }

  toBook() {
    this.router.navigate(['book', this.book.id]).then(
      () => this.onClose('navigated')
    )
  }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  onClose(e) {
    this.close.emit(e);
  }

  closeDialog() {
    this.close.emit('canceled');
  }

  afterSave(id, book: Book) {
    this.book = book;
    this.toastr.success('opgeslagen!', this.book.title);
    this.bookChange.emit(book);
    this.close.emit('saved');
  }

  save() {
    const book = {
      ...this.formGroup.value,
      id: this.book.id
    };
    this.booksService.saveBook(book).subscribe(
      response => this.afterSave(response, book)
    )
  }


  initForm() {
    this.formGroup = this.formEditService.initForm(
      this.options, this.book);
  }

  changeBook() {
    this.refresh = '?now=' + new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.book) {
      const book: Book = changes.book.currentValue;
    }
  }

  ngOnInit() {
    console.log(this.book);
    this.initForm();
  }

}
