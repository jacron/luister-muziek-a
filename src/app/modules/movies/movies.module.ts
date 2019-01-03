import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesStartComponent } from './components/movies-start/movies-start.component';
import {MatModule} from '../mat/mat.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieComponent } from './components/movie/movie.component';
import {RouterModule} from '@angular/router';
import { DirectorComponent } from './components/director/director.component';

@NgModule({
  declarations: [
    MoviesStartComponent,
    MoviesListComponent,
    MovieComponent,
    DirectorComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    RouterModule,
    FormsModule,  // needed for input
    ReactiveFormsModule, // needed for formcontrol
  ],
  exports: [
    MoviesStartComponent
  ]
})
export class MoviesModule { }
