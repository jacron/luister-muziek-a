import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumComponent} from '../album/album.component';
import {ToolsComponent} from '../tools/tools.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {SearchComponent} from '../search/search.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'album/:idalbum', component: AlbumComponent },
  { path: 'search/:idcomp/:idperf/:idcoll', component: SearchComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'album/:id', component: AlbumComponent },
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
