import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesStartComponent } from './components/movies-start/movies-start.component';
import {MatModule} from '../mat/mat.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieComponent } from './components/movie/movie.component';
import {RouterModule} from '@angular/router';
import { DirectorComponent } from './components/director/director.component';
import { DirectorCardComponent } from './components/director-card/director-card.component';
import { DirectorAutocompleteComponent } from './components/director-autocomplete/director-autocomplete.component';
import { TitleAutocompleteComponent } from './components/title-autocomplete/title-autocomplete.component';

@NgModule({
  declarations: [
    MoviesStartComponent,
    MoviesListComponent,
    MovieComponent,
    DirectorComponent,
    DirectorCardComponent,
    DirectorAutocompleteComponent,
    TitleAutocompleteComponent
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
