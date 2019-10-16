import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BooksStartComponent} from '../books/components/books-start/books-start.component';
import {AuthorComponent} from '../books/components/author/author.component';
import {BookComponent} from '../books/components/book/book.component';
import {AuthorsComponent} from '../books/components/authors/authors.component';
import {TitleQueryComponent} from '../books/components/title-query/title-query.component';
import {BookBarcodesComponent} from '../books/components/book-barcodes/book-barcodes.component';

const routes: Routes = [
  {path: 'books', component: BooksStartComponent},
  {path: 'books/:idbook', component: BookComponent},
  {path: 'books/search/:query', component: TitleQueryComponent},
  {path: 'books-barcodes', component: BookBarcodesComponent},
  {path: 'books/:genre/:limit', component: BooksStartComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'author/:idauthor', component: AuthorComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      routes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
})
export class BookRoutingModule { }
