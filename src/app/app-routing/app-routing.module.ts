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
import {ComponistComponent} from '../componist/componist.component';
import {PerformerComponent} from '../performer/performer.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:idcomp/:idperf/:idcoll/:idtag', component: SearchComponent},
  {path: 'album/:idalbum', component: AlbumDetailsComponent},
  {path: 'tools', component: ToolsComponent},
  {path: 'componist', component: ComponistComponent},
  {path: 'performer', component: PerformerComponent},
  {path: 'code', component: CodeComponent},
  {path: 'code/:idcode', component: CodeComponent},
  {path: 'code/list/:code/:fav', component: CodeListComponent},
  {path: 'code/list/:code', component: CodeListComponent},
  {path: 'settings', component: SettingsComponent},
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
