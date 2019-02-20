import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooksStartComponent} from './components/books-start/books-start.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatModule} from '../mat/mat.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthorAutocompleteComponent } from './components/autocomplete/author-autocomplete/author-autocomplete.component';
import { TitleAutocompleteComponent } from './components/autocomplete/title-autocomplete/title-autocomplete.component';

@NgModule({
  declarations: [
    BooksStartComponent,
    AuthorAutocompleteComponent,
    TitleAutocompleteComponent,
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
