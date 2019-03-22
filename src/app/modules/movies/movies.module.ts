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
import { SpelerAutocompleteComponent } from './components/autocomplete/speler-autocomplete/speler-autocomplete.component';
import { SpelerComponent } from './components/speler/speler.component';
import { SpelerCardComponent } from './components/speler-card/speler-card.component';
import { MovieJaarComponent } from './components/movie-jaar/movie-jaar.component';
import { MoviesToNewFromImdbComponent } from './components/movies-to-new-from-imdb/movies-to-new-from-imdb.component';
import { MoviesNewFromImdbComponent } from './components/movies-new-from-imdb/movies-new-from-imdb.component';
import {SharedModule} from '../shared/shared.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { DirectorsComponent } from './components/directors/directors.component';
import { DialogDirectorComponent } from './dialogs/dialog-director/dialog-director.component';
import { DirectorEditCardComponent } from './components/director-edit-card/director-edit-card.component';
import { DirectorFilmsListComponent } from './components/director-films-list/director-films-list.component';
import { DirectorEditMenuComponent } from './components/director-edit-menu/director-edit-menu.component';

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
    SpelerAutocompleteComponent,
    SpelerComponent,
    SpelerCardComponent,
    MovieJaarComponent,
    MoviesToNewFromImdbComponent,
    MoviesNewFromImdbComponent,
    MovieDetailsComponent,
    DirectorsComponent,
    DialogDirectorComponent,
    DirectorEditCardComponent,
    DirectorFilmsListComponent,
    DirectorEditMenuComponent,
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
    MoviesStartComponent
  ],
  entryComponents: [
    DialogDirectorComponent
  ],
})
export class MoviesModule { }
