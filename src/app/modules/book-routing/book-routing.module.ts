import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BooksStartComponent} from '../books/components/books-start/books-start.component';
import {AuthorComponent} from '../books/components/author/author.component';
import {BookComponent} from '../books/components/book/book.component';

const routes: Routes = [
  {path: 'books', component: BooksStartComponent},
  {path: 'books/:idbook', component: BookComponent},
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
