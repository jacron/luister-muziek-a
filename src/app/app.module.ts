import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MusicService } from './shared/services/music.service';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ToolsComponent } from './tools/tools.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule} from './app-routing/app-routing.module';
import { TypedNamePipe } from './pipes/typed-name.pipe';
import { TypedTitlePipe } from './pipes/typed-title.pipe';
import { StorageService} from './services/storage.service';
import {PieceService} from './album/services/piece.service';
import {PersonService} from './services/person.service';
import { CodeComponent } from './components/code/code.component';
import { CodeListComponent } from './components/code-list/code-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import {UtilService} from './services/util.service';
import {CuesheetService} from './album/services/cuesheet.service';
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
import {MatModule} from './mat/mat.module';
import { ChipComponent } from './components/chip/chip.component';
import {StateService} from './services/state.service';
import { ListLinksComponent } from './components/list-links/list-links.component';
import { PopComponent } from './components/pop/pop.component';
import { PopListComponent } from './components/pop-list/pop-list.component';
import { HomeComponent } from './components/home/home.component';
import {AlbumModule} from './album/album.module';
import {SharedModule} from './shared/shared.module';
import { SimpleChipListsComponent } from './components/simple-chip-lists/simple-chip-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SearchComponent,
    WelcomeComponent,
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
    ChipComponent,
    ListLinksComponent,
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
    MatModule,
    ReactiveFormsModule,
    AlbumModule,
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
