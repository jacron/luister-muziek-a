import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolsComponent} from '../tools/tools.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {SearchComponent} from '../components/search/search.component';
import {AlbumDetailsComponent} from '../components/album-details/album-details.component';
import {CodesComponent} from '../codes/codes.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'album/:idalbum', component: AlbumDetailsComponent },
  { path: 'search/:idcomp/:idperf/:idcoll/:idtag', component: SearchComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'codes', component: CodesComponent },
  { path: '**', component: PageNotFoundComponent }
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
