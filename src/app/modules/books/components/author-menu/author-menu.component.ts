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
      color: '#ffa',
      action: this.toggleEdit.bind(this)
    },
    {
      label: 'divider',
      icon: '',
    },
    {
      label: 'Google',
      icon: 'search',
      color: 'violet',
      action: this.google.bind(this)
    },
    {
      label: 'wiki nl',
      icon: 'info',
      color: '#5ff',
      action: this.wikipedia.bind(this, 'nl')
    },
    {
      label: 'wiki en',
      icon: 'info',
      color: '#f55',
      action: this.wikipedia.bind(this, 'en')
    },
    {
      label: 'wiki de',
      icon: 'info',
      color: '#aaa',
      action: this.wikipedia.bind(this, 'de')
    },
    {
      label: 'wiki fr',
      icon: 'info',
      color: '#3cf',
      action: this.wikipedia.bind(this, 'fr')
    },
    {
      label: 'divider',
      icon: '',
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
    this.booksService.getAuthorPictureFromUrl(this.author.id).subscribe(
      () => this.afterGetCover()
    );
  }

  afterPastePicture(response) {
    this.author.imgurl = response;
    this.toastr.success('url afbeelding ingeplakt', 'cover');
  }

  pastePicture() {
    this.booksService.pasteAuthorPicture(this.author.id).subscribe(
      response => this.afterPastePicture(response),
      err => console.log(err)
    )
  }

  afterWiki(result) {
    if (result && result.image) {
      this.wikiCache = {
        imgurl: result.image.source,
        description: result.description,
        extract: result.extract
      };
      this.wiki.emit(this.wikiCache);
    }
  }

  wikipedia(lng) {
    const name = this.author.first + ' ' + this.author.last;
    this.booksService.wikiInfo(name, lng).subscribe(
      result => this.afterWiki(result),
      () => this.toastr.error('Geen wiki-gegevens voor taal: ' + lng)
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
