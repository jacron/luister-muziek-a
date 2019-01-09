import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolsComponent} from '../../tools/tools.component';
import {PageNotFoundComponent} from '../../page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from '../../components/search/search.component';
import {AlbumDetailsComponent} from '../album/components/album-details/album-details.component';
import {CodeComponent} from '../../components/code/code.component';
import {CodeListComponent} from '../../components/code-list/code-list.component';
import {SettingsComponent} from '../../components/settings/settings.component';
import {ComponistComponent} from '../../components/componist/componist.component';
import {PerformerComponent} from '../../components/performer/performer.component';
import {CollectieComponent} from '../../components/collectie/collectie.component';
import {TagComponent} from '../../components/tag/tag.component';
import {TagListComponent} from '../../components/tag-list/tag-list.component';
import {RecentComponent} from '../../components/recent/recent.component';
import {PopComponent} from '../../components/pop/pop.component';
import {PopListComponent} from '../../components/pop-list/pop-list.component';
import {HomeComponent} from '../../components/home/home.component';
import {MoviesStartComponent} from '../movies/components/movies-start/movies-start.component';
import {MovieComponent} from '../movies/components/movie/movie.component';
import {DirectorComponent} from '../movies/components/director/director.component';
import {SpelerComponent} from '../movies/components/speler/speler.component';

const appRoutes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:idcomp/:idperf/:idcoll/:idtag', component: SearchComponent},
  {path: 'album/:idalbum', component: AlbumDetailsComponent},
  {path: 'album/:idalbum/:idpiece', component: AlbumDetailsComponent},
  {path: 'tools', component: ToolsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'composer', component: ComponistComponent},
  {path: 'performer', component: PerformerComponent},
  {path: 'collection', component: CollectieComponent},
  {path: 'tag', component: TagComponent},
  {path: 'tag/:id', component: TagListComponent},
  {path: 'code', component: CodeComponent},
  {path: 'code/:idcode', component: CodeComponent},
  {path: 'code/list/:code/:id', component: CodeListComponent},
  {path: 'code/list/:code', component: CodeListComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'recent', component: RecentComponent},
  {path: 'pop', component: PopComponent},
  {path: 'pop/:id', component: PopListComponent},
  {path: 'movies', component: MoviesStartComponent},
  {path: 'movies/:idmovie', component: MovieComponent},
  {path: 'director/:iddirector', component: DirectorComponent},
  {path: 'speler/naam/:naamspeler', component: SpelerComponent},
  {path: 'speler/:idspeler', component: SpelerComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
