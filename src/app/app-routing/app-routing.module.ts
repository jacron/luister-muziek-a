import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolsComponent} from '../tools/tools.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {SearchComponent} from '../components/search/search.component';
import {AlbumDetailsComponent} from '../components/album-details/album-details.component';
import {CodeComponent} from '../components/code/code.component';
import {CodeListComponent} from '../components/code-list/code-list.component';
import {SettingsComponent} from '../components/settings/settings.component';
import {ComponistListComponent} from '../components/componist-list/componist-list.component';
import {PerformerListComponent} from '../components/performer-list/performer-list.component';
import {ComponistComponent} from '../components/componist/componist.component';
import {PerformerComponent} from '../components/performer/performer.component';
import {CollectieComponent} from '../components/collectie/collectie.component';
import {CollectieListComponent} from '../components/collectie-list/collectie-list.component';
import {TagComponent} from '../components/tag/tag.component';
import {TagListComponent} from '../components/tag-list/tag-list.component';
import {RecentComponent} from '../components/recent/recent.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:idcomp/:idperf/:idcoll/:idtag', component: SearchComponent},
  {path: 'album/:idalbum', component: AlbumDetailsComponent},
  {path: 'tools', component: ToolsComponent},
  {path: 'componist', component: ComponistComponent},
  {path: 'componist/:id', component: ComponistListComponent},
  {path: 'performer', component: PerformerComponent},
  {path: 'performer/:id', component: PerformerListComponent},
  {path: 'collectie', component: CollectieComponent},
  {path: 'collectie/:id', component: CollectieListComponent},
  {path: 'tag', component: TagComponent},
  {path: 'tag/:id', component: TagListComponent},
  {path: 'code', component: CodeComponent},
  {path: 'code/:idcode', component: CodeComponent},
  {path: 'code/list/:code/:fav', component: CodeListComponent},
  {path: 'code/list/:code', component: CodeListComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'recent', component: RecentComponent},
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
