import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BooksStartComponent} from '../books/components/books-start/books-start.component';

const routes: Routes = [
  {path: 'books', component: BooksStartComponent},
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
