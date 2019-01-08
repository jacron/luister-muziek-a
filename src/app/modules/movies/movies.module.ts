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
import { DirectorAutocompleteComponent } from './components/autocomplete/director-autocomplete/director-autocomplete.component';
import { TitleAutocompleteComponent } from './components/autocomplete/title-autocomplete/title-autocomplete.component';
import { MoviesRecentlyPlayedComponent } from './components/movies-recently-played/movies-recently-played.component';
import { MoviesRecentlyAddedComponent } from './components/movies-recently-added/movies-recently-added.component';
import { MoviesRecentlySeenComponent } from './components/movies-recently-seen/movies-recently-seen.component';
import { MovieMenuComponent } from './components/movie-menu/movie-menu.component';

@NgModule({
  declarations: [
    MoviesStartComponent,
    MoviesListComponent,
    MovieComponent,
    DirectorComponent,
    DirectorCardComponent,
    DirectorAutocompleteComponent,
    TitleAutocompleteComponent,
    MoviesRecentlyPlayedComponent,
    MoviesRecentlyAddedComponent,
    MoviesRecentlySeenComponent,
    MovieMenuComponent,
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
