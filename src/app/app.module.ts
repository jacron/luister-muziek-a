import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MusicService } from './services/music.service';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { ToolsComponent } from './tools/tools.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule} from './modules/app-routing/app-routing.module';
import { TypedNamePipe } from './pipes/typed-name.pipe';
import { TypedTitlePipe } from './pipes/typed-title.pipe';
import { StorageService} from './services/storage.service';
import {PersonService} from './services/person.service';
import { CodeComponent } from './components/code/code.component';
import { CodeListComponent } from './components/code-list/code-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import {UtilService} from './services/util.service';
import { ComponistComponent } from './components/componist/componist.component';
import { PerformerComponent } from './components/performer/performer.component';
import { AlphabetComponent } from './components/alphabet/alphabet.component';
import { PersonsComponent } from './components/persons/persons.component';
import { StartletterPipe } from './pipes/startletter.pipe';
import { CollectieComponent } from './components/collectie/collectie.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagComponent } from './components/tag/tag.component';
import { CollectiesComponent } from './components/collecties/collecties.component';
import { TagsComponent } from './components/tags/tags.component';
import { DialogCustomizeSearchComponent } from './dialogs/dialog-customize-search/dialog-customize-search.component';
import {ChoiceService} from './services/choice.service';
import { VisiblePipe } from './pipes/visible.pipe';
import { RecentComponent } from './components/recent/recent.component';
import {MatModule} from './modules/mat/mat.module';
import {StateService} from './services/state.service';
import { PopComponent } from './components/pop/pop.component';
import { PopListComponent } from './components/pop-list/pop-list.component';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from './modules/shared/shared.module';
import { SimpleChipListsComponent } from './components/simple-chip-lists/simple-chip-lists.component';
import {AlbumModule} from './modules/album/album.module';
import {PieceService} from './modules/album/services/piece.service';
import {CuesheetService} from './modules/cuesheet/services/cuesheet.service';
import {ChipsModule} from './modules/chips/chips.module';
import {MoviesModule} from './modules/movies/movies.module';
import {MovieRoutingModule} from './modules/movie-routing/movie-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SearchComponent,
    ToolsComponent,
    TypedNamePipe,
    TypedTitlePipe,
    CodeComponent,
    CodeListComponent,
    SettingsComponent,
    SearchFormComponent,
    AlbumListComponent,
    ComponistComponent,
    PerformerComponent,
    AlphabetComponent,
    PersonsComponent,
    StartletterPipe,
    CollectieComponent,
    TagListComponent,
    TagComponent,
    CollectiesComponent,
    TagsComponent,
    DialogCustomizeSearchComponent,
    VisiblePipe,
    RecentComponent,
    PopComponent,
    PopListComponent,
    HomeComponent,
    SimpleChipListsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,  // needed for ngModel
    HttpClientModule,
    AppRoutingModule,
    MovieRoutingModule,
    MatModule,
    ReactiveFormsModule,
    AlbumModule,
    ChipsModule,
    MoviesModule,
    SharedModule
  ],
  exports: [
  ],
  entryComponents: [
    DialogCustomizeSearchComponent,
    AppComponent,
  ],
  // schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MusicService,
    PieceService,
    PersonService,
    TypedNamePipe,
    TypedTitlePipe,
    StorageService,
    UtilService,
    CuesheetService,
    ChoiceService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
