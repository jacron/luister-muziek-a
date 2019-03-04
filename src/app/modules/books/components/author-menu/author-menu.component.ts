import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {environment} from '../../../../../environments/environment';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';
import {Author} from '../../../../classes/book/author';

@Component({
  selector: 'app-author-menu',
  templateUrl: './author-menu.component.html',
  styleUrls: ['./author-menu.component.scss']
})
export class AuthorMenuComponent implements OnInit {
  @Input() author: Author;
  wikiCache;
  @Output() wiki = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Output() edit = new EventEmitter();

  options: MenuOption[] = [
    {
      label: 'Bewerk',
      icon: 'edit',
      action: this.toggleEdit.bind(this)
    },
    {
      label: 'Google',
      icon: 'search',
      action: this.google.bind(this)
    },
    {
      label: 'Plak url',
      icon: 'brush',
      color: 'green',
      action: this.pastePicture.bind(this)
    },
    {
      label: 'Gebruik url',
      icon: 'account_balance_wallet',
      color: 'green',
      action: this.getCover.bind(this)
    },
    {
      label: 'divider',
      icon: '',
    },
    {
      label: 'wiki nl',
      icon: 'wiki',
      action: this.wikipedia_nl.bind(this)
    },
    {
      label: 'wiki en',
      icon: 'wiki',
      action: this.wikipedia_en.bind(this)
    },
    {
      label: 'divider',
      icon: '',
    },
    {
      label: 'Verwijder',
      icon: 'clear',
      color: 'rgb(245, 24, 24)',
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

  toggleEdit() {
    this.edit.emit();
  }

  afterGetCover() {
    this.toastr.success('schrijversfoto opgeslagen', 'afbeelding');
    this.refresh.emit('?' + new Date());
  }

  getCover() {
    this.toastr.info('afbeelding auteur naar cache', 'afbeelding');
    this.booksService.getAuthorPicture(this.author.id).subscribe(
      () => this.afterGetCover()
    );
  }

  afterPastePicture(response) {
    this.author.imgurl = response.text;
    this.toastr.success('url afbeelding ingeplakt', 'cover');
  }

  pastePicture() {
    this.booksService.pasteAuthorPicture(this.author.id).subscribe(
      response => this.afterPastePicture(response)
    )
  }

  afterWiki(result) {
    // console.log(result);
    this.toastr.success('gegevens zijn opeghaald', 'wikipedia');
    if (result && result.image) {
      this.wikiCache = {
        imgurl: result.image.source,
        description: result.description,
        extract: result.extract
      };
      this.wiki.emit(this.wikiCache);
    }
  }

  wikipedia_nl() {
    this.wikipedia('nl');
  }

  wikipedia_en() {
    this.wikipedia('en');
  }

  wikipedia(lng) {
    const name = this.author.first + ' ' + this.author.last;
    // console.log(name);
    // this.toastr.info('haal gegevens op', 'wikipedia');
    this.booksService.wikiAuthor(name, lng).subscribe(
      result => this.afterWiki(result)
    )
  }

  google() {
    window.open(environment.googleUrl +
      this.author.first + ' ' + this.author.last);
  }

  remove() {
    if (confirm('Remove this author?')) {
      this.booksService.removeAuthor(this.author.id).subscribe(
        response => console.log(response)
      )
    }
  }

  ngOnInit() {
  }

}
