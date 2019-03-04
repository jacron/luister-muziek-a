import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {FormOption} from '../../../../classes/shared/FormOption';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {
  @Input() author: Author;
  editAuthor = false;
  formGroup: FormGroup;
  options: FormOption[];
  wiki;
  imageUrl = environment.booksServer + '/authorpicture/';
  refresh = '?';

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
  ) {
  }

  setWiki(e) {
    this.wiki = e;
  }

  setRefresh(e) {
    this.refresh = e;
    this.wiki.imgurl = null;
  }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  edit() {
    this.editAuthor = !this.editAuthor;
  }

  afterSave(id, author: Author) {
    this.author = author;
    this.toastr.success('opgeslagen!', this.author.last);
    // this.bookChange.emit(book);
  }

  save() {
    const a: Author = this.formGroup.value;

    const author: Author = {
      id: this.author.id,
      first: a.first,
      last: a.last,
      born: a.born,
      died: a.died,
      country: a.country,
      imgurl: a.imgurl,
      url: a.url,
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
      {
        name: 'imgurl',
        label: 'Afbeeldingsurl',
      },
      {
        name: 'country',
        label: 'Land',
      },
      {
        name: 'url',
        label: 'Url',
      },
    ];
    const controls = {};
    this.options.forEach(option => {
      controls[option.name] = new FormControl(this.author[option.name], option.validators);
    });
    this.formGroup = new FormGroup(controls);
  }

  ngOnInit() {
    this.initForm();
  }

}
