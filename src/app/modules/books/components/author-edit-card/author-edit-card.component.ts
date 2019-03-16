import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormOption} from '../../../../classes/shared/FormOption';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-author-edit-card',
  templateUrl: './author-edit-card.component.html',
  styleUrls: ['./author-edit-card.component.scss']
})
export class AuthorEditCardComponent implements OnInit {
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
  ) { }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  onRefresh() {
    this.refresh = '?now=' + new Date();
  }

  onClose(e) {
    this.close.emit(e);
  }

  toggle() {
    this.toggleBooksList.emit();
  }

  afterRemove() {
    this.toastr.success('verwijderd!', this.author.last);
    this.close.emit('removed');
  }

  remove() {
    if (confirm('Remove this author?')) {
      this.booksService.removeAuthor(this.author.id).subscribe(
        () => this.afterRemove()
      )
    }
  }

  afterSave(id, author: Author) {
    this.author = author;
    this.toastr.success('opgeslagen!', this.author.last);
    this.authorChange.emit(author);
    this.close.emit('saved');
  }

  save() {
    const a: Author = this.formGroup.value;

    const author: Author = {
      id: this.author.id,
      first: a.first,
      last: a.last,
      born: a.born,
      died: a.died,
    };
    this.booksService.saveAuthor(author).subscribe(
      response => this.afterSave(response, author)
    )
  }

  initForm() {
    this.options = [
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
    ];
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

  changeWiki(lng) {
    this.wiki.emit(lng);
  }

  ngOnInit() {
    this.initForm();
  }

}
