import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormOption} from '../../../../classes/shared/FormOption';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';
import {FormEditService} from '../../../shared/services/form-edit.service';

const formOptions: FormOption[] = [
  {
    name: 'first',
    label: 'Voornaam',
  },
  {
    name: 'last',
    validators: [Validators.required],
    label: 'Achternaam',
  },
  {
    name: 'born',
    label: 'Geboren',
  },
  {
    name: 'died',
    label: 'Overleden',
  },
  {
    name:'country',
    label: 'Land'
  },
  {
    name: 'genre',
    label: 'Genre',
  },
];


@Component({
  selector: 'app-author-edit-card',
  templateUrl: './author-edit-card.component.html',
  styleUrls: ['./author-edit-card.component.scss']
})
export class AuthorEditCardComponent implements OnInit, OnChanges {
  @Input() author: Author;
  @Input() refresh: string;
  @Output() close = new EventEmitter();
  @Output() authorChange = new EventEmitter();
  @Output() toggleBooksList = new EventEmitter();
  @Output() wiki = new EventEmitter();

  formGroup: FormGroup;
  options: FormOption[];
  imageUrl = environment.booksServer + '/image/author/';

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
    private router: Router,
    private formEditService: FormEditService,
  ) { }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  onClose(e) {
    this.close.emit(e);
  }

  afterRemove() {
    this.toastr.success('verwijderd!', this.author.first + ' ' + this.author.last);
    this.close.emit('removed');
  }

  remove() {
    if (confirm('Remove this author?')) {
      this.booksService.removeAuthor(this.author.id).subscribe(
        () => this.afterRemove()
      )
    }
  }

  closeDialog() {
    this.close.emit('canceled');
  }

  afterSave(id, author: Author) {
    this.author = author;
    this.toastr.success('opgeslagen!', this.author.first + ' ' + this.author.last);
    this.authorChange.emit(author);
    this.close.emit('saved');
  }

  save() {
    const current: Author = this.formGroup.value;
    const country = this.formEditService.fromShortCountry(current.country);
    const {born, died} = this.formEditService.fromBornDied(current.born, current.died);
    // const born = this.formEditService.fromShortYear(current.born);
    // const died = this.formEditService.fromShortYear(current.died);
    const author = {
      ...current,
      country,
      born,
      died,
      id: this.author.id,
    };
    this.booksService.saveAuthor(author).subscribe(
      response => this.afterSave(response, author)
    )
  }

  initForm() {
    this.options = formOptions;
    const controls = {};
    this.options.forEach(option => {
      controls[option.name] = new FormControl(this.author[option.name], option.validators);
    });
    this.formGroup = new FormGroup(controls);
  }

  toAuthor() {
    this.router.navigate(['author', this.author.id]).then(
      () => this.onClose('navigated')
    );
  }

  changeAuthor() {
    this.refresh = '?now=' + new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.author && this.formGroup) {
      const author: Author = changes.author.currentValue;
      this.formGroup.controls['died'].setValue(author.died);
      this.formGroup.controls['born'].setValue(author.born);
    }
  }

  ngOnInit() {
    this.initForm();
  }

}
