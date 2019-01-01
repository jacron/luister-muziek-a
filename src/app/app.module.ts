import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MusicService } from './services/music.service';

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
// import { AlbumDetailsComponent } from './album/components/album-details/album-details.component';
// import { AlbumPersonsComponent } from './album/components/album-persons/album-persons.component';
// import { AlbumPiecesComponent } from './album/components/album-pieces/album-pieces.component';
// import { AlbumCuesheetsComponent } from './album/components/album-cuesheets/album-cuesheets.component';
import { DialogPicComponent } from './dialogs/dialog-pic/dialog-pic.component';
// import { ChipListsComponent } from './album/components/chip-lists/chip-lists.component';
import { StorageService} from './services/storage.service';
// import { AlbumMetatagsComponent } from './album/components/album-metatags/album-metatags.component';
import { DialogAddComponent } from './dialogs/dialog-add/dialog-add.component';
import { DialogPersonComponent } from './dialogs/dialog-person/dialog-person.component';
import { DialogTagComponent } from './dialogs/dialog-tag/dialog-tag.component';
import { DialogPiecesComponent } from './dialogs/dialog-pieces/dialog-pieces.component';
import {PieceService} from './services/piece.service';
import {PersonService} from './services/person.service';
import { CodeComponent } from './components/code/code.component';
import { CodeListComponent } from './components/code-list/code-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import {UtilService} from './services/util.service';
import {CuesheetService} from './services/cuesheet.service';
import { DialogInputComponent } from './dialogs/dialog-input/dialog-input.component';
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
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { DialogCustomizeSearchComponent } from './dialogs/dialog-customize-search/dialog-customize-search.component';
import {ChoiceService} from './services/choice.service';
import { VisiblePipe } from './pipes/visible.pipe';
import { DialogInstrumentComponent } from './dialogs/dialog-instrument/dialog-instrument.component';
import { RecentComponent } from './components/recent/recent.component';
import {MatModule} from './mat/mat.module';
// import { AlbumMenuComponent } from './album/components/album-menu/album-menu.component';
// import { CuesheetPartsComponent } from './album/components/cuesheet-parts/cuesheet-parts.component';
// import { CuesheetActionsComponent } from './album/components/cuesheet-actions/cuesheet-actions.component';
import { ChipComponent } from './components/chip/chip.component';
import {StateService} from './services/state.service';
import { DialogAlbumComponent } from './dialogs/dialog-album/dialog-album.component';
import { ListLinksComponent } from './components/list-links/list-links.component';
import { DialogSettingsComponent } from './dialogs/dialog-settings/dialog-settings.component';
import { PopComponent } from './components/pop/pop.component';
import { PopListComponent } from './components/pop-list/pop-list.component';
import { HomeComponent } from './components/home/home.component';
import { DialogCategoryComponent } from './dialogs/dialog-category/dialog-category.component';
import {AlbumModule} from './album/album.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SearchComponent,
    WelcomeComponent,
    ToolsComponent,
    TypedNamePipe,
    TypedTitlePipe,
    // AlbumDetailsComponent,
    // AlbumPersonsComponent,
    // AlbumPiecesComponent,
    // AlbumCuesheetsComponent,
    // ChipListsComponent,
    // AlbumMetatagsComponent,
    DialogPicComponent,
    DialogAddComponent,
    DialogPersonComponent,
    DialogTagComponent,
    DialogPiecesComponent,
    CodeComponent,
    CodeListComponent,
    SettingsComponent,
    SearchFormComponent,
    AlbumListComponent,
    DialogInputComponent,
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
    TypeaheadComponent,
    DialogCustomizeSearchComponent,
    VisiblePipe,
    DialogInstrumentComponent,
    RecentComponent,
    // AlbumMenuComponent,
    // CuesheetPartsComponent,
    // CuesheetActionsComponent,
    ChipComponent,
    DialogAlbumComponent,
    ListLinksComponent,
    DialogSettingsComponent,
    PopComponent,
    PopListComponent,
    HomeComponent,
    DialogCategoryComponent,
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
  ],
  entryComponents: [
    DialogPicComponent,
    DialogAddComponent,
    DialogPersonComponent,
    DialogTagComponent,
    DialogPiecesComponent,
    DialogInputComponent,
    DialogCustomizeSearchComponent,
    DialogInstrumentComponent,
    DialogAlbumComponent,
    DialogSettingsComponent,
    DialogCategoryComponent,
    AppComponent,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
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
