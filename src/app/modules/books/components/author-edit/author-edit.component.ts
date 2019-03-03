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
  wikiImg: string;
  wikiDescription;
  wikiExtract;
  imageUrl = environment.booksServer + '/authorpicture/';
  refresh = '?';

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
  ) {
  }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  edit() {
    this.editAuthor = !this.editAuthor;
  }

  getCover() {
    this.toastr.info('afbeelding auteur naar cache', 'afbeelding');
    this.booksService.getAuthorPicture(this.author.id).subscribe(
      response => console.log(response)
    );
  }

  // getImageSource() {
  //   const requestUrl = environment.booksServer;
  //   return requestUrl + '/authorpicture/' + this.author.id;
  // }

  afterSave(id, author: Author) {
    this.author = author;
    this.toastr.success('opgeslagen!', this.author.last);
    // this.bookChange.emit(book);
  }

  afterWiki(result) {
    console.log(result);
    this.toastr.success('gegevens zijn opeghaald', 'wikipedia')
    if (result && result.image) {
      // console.log(result.image.source);
      this.wikiImg = result.image.source;
      // this.wikiThumb = result.thumbnail.source;
      this.wikiDescription = result.description;
      this.wikiExtract = result.extract;
    }
  }

  wikipedia(lng) {
    const name = this.author.first + ' ' + this.author.last
    console.log(name);
    this.toastr.info('haal gegevens op', 'wikipedia')
    this.booksService.wikiAuthor(name, lng).subscribe(
      result => this.afterWiki(result)
    )
  }

  google() {
    window.open(environment.googleUrl +
      this.author.first + ' ' + this.author.last);
  }

  afterStoreWiki() {
    this.toastr.success('Wiki afbeelding opgeslagen', 'wiki');
    this.refresh = '?' + new Date();
    this.wikiImg = null;
  }

  storeWiki() {
    this.booksService.storeWikiAuthorImg(this.wikiImg, this.author.id).subscribe(
      () => this.afterStoreWiki()
    )
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
