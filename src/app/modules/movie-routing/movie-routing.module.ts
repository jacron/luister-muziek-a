import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MoviesStartComponent} from '../movies/components/movies-start/movies-start.component';
import {MovieJaarComponent} from '../movies/components/movie-jaar/movie-jaar.component';
import {MovieComponent} from '../movies/components/movie/movie.component';
import {DirectorComponent} from '../movies/components/director/director.component';
import {SpelerComponent} from '../movies/components/speler/speler.component';
import {MoviesRecentlyPlayedComponent} from '../movies/components/movies-recently-played/movies-recently-played.component';
import {MoviesRecentlyAddedComponent} from '../movies/components/movies-recently-added/movies-recently-added.component';
import {MoviesRecentlySeenComponent} from '../movies/components/movies-recently-seen/movies-recently-seen.component';
import {MoviesNewFromImdbComponent} from '../movies/components/movies-new-from-imdb/movies-new-from-imdb.component';
import {DirectorsComponent} from '../movies/components/directors/directors.component';

const routes: Routes = [
  {path: 'movies', component: MoviesStartComponent},
  {path: 'movies/jaar/:jaar', component: MovieJaarComponent},
  {path: 'movies/:idmovie', component: MovieComponent},
  {path: 'director/:iddirector', component: DirectorComponent},
  {path: 'directors', component: DirectorsComponent},
  {path: 'speler/naam/:naamspeler', component: SpelerComponent},
  {path: 'speler/:idspeler', component: SpelerComponent},
  {path: 'recentlyplayed', component: MoviesRecentlyPlayedComponent},
  {path: 'recentlyadded', component: MoviesRecentlyAddedComponent},
  {path: 'recentlyseen', component: MoviesRecentlySeenComponent},
  {path: 'movies/new/:tt', component: MoviesNewFromImdbComponent},

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
export class MovieRoutingModule { }
