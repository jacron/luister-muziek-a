import {Component, Input, OnInit} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {
  @Input() author: Author;
  editAuthor = false;
  formGroup: FormGroup;
  options;

  constructor(
    private booksService: BooksService,
  ) { }

  edit() {
    this.editAuthor = !this.editAuthor;
  }

  getCover() {
    this.booksService.getPicture(this.author.id).subscribe(
      response => console.log(response)
    );
  }

  getImageSource() {
    const requestUrl = environment.booksServer;
    return requestUrl + '/authorpicture/' + this.author.id;
  }

  afterSave(id, author: Author) {
    this.author = author;
    // this.bookChange.emit(book);
  }

  remove() {
    if (confirm('Remove this author?')) {
      this.booksService.removeAuthor(this.author.id).subscribe(
        response => console.log(response)
      )
    }
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
        name: 'country',
        label: 'Land',
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
