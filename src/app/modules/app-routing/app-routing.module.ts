import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolsComponent} from '../../tools/tools.component';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from '../music/components/search/search.component';
import {AlbumDetailsComponent} from '../music/album/components/album-details/album-details.component';
import {CodeComponent} from '../music/components/code/code.component';
import {CodeListComponent} from '../music/components/code-list/code-list.component';
import {SettingsComponent} from '../../components/settings/settings.component';
import {ComponistComponent} from '../music/components/componist/componist.component';
import {PerformerComponent} from '../music/components/performer/performer.component';
import {CollectieComponent} from '../music/components/collectie/collectie.component';
import {TagComponent} from '../music/components/tag/tag.component';
import {TagListComponent} from '../music/components/tag-list/tag-list.component';
import {RecentComponent} from '../music/components/recent/recent.component';
import {PopComponent} from '../music/components/pop/pop.component';
import {PopListComponent} from '../music/components/pop-list/pop-list.component';
import {HomeComponent} from '../music/components/home/home.component';
import {VideosKlassiekComponent} from '../music/components/videos-klassiek/videos-klassiek.component';
import {VideosPopComponent} from '../music/components/videos-pop/videos-pop.component';
import {VideoDocumentaireComponent} from '../music/components/video-documentaire/video-documentaire.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
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
  {path: 'videos/klassiek', component: VideosKlassiekComponent},
  {path: 'videos/pop', component: VideosPopComponent},
  {path: 'videos/documentaire', component: VideoDocumentaireComponent}
  // {path: '**', component: PageNotFoundComponent}
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
