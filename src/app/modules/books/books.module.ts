import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooksStartComponent} from './components/books-start/books-start.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatModule} from '../mat/mat.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthorAutocompleteComponent } from './components/autocomplete/author-autocomplete/author-autocomplete.component';
import { TitleAutocompleteComponent } from './components/autocomplete/title-autocomplete/title-autocomplete.component';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { TitleQueryComponent } from './components/title-query/title-query.component';
import { BookAuthorAutocompleteComponent } from './components/autocomplete/book-author-autocomplete/book-author-autocomplete.component';
import { BookProposalComponent } from './components/book-proposal/book-proposal.component';
import { BookMenuComponent } from './components/book-menu/book-menu.component';
import { AuthorMenuComponent } from './components/author-menu/author-menu.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { AuthorWikiComponent } from './components/author-wiki/author-wiki.component';

@NgModule({
  declarations: [
    BooksStartComponent,
    AuthorAutocompleteComponent,
    TitleAutocompleteComponent,
    AuthorComponent,
    BookComponent,
    BookCardComponent,
    BookEditComponent,
    AuthorsComponent,
    AuthorEditComponent,
    EditFieldComponent,
    TitleQueryComponent,
    BookAuthorAutocompleteComponent,
    BookProposalComponent,
    BookMenuComponent,
    AuthorMenuComponent,
    AuthorCardComponent,
    AuthorWikiComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatModule,
    RouterModule,
    FormsModule,  // needed for input
    ReactiveFormsModule, // needed for formcontrol
  ],
  exports: [
    BooksStartComponent
  ]
})
export class BooksModule { }
