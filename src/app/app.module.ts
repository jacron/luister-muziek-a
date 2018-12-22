import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MusicService } from './services/music.service';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ToolsComponent } from './tools/tools.component';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule,
  MatIconModule, MatInputModule, MatListModule,
  MatMenuModule,
  MatSelectModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlbumThumbComponent } from './components/album-thumb/album-thumb.component';
import { AppRoutingModule} from './app-routing/app-routing.module';
import { TypedNamePipe } from './pipes/typed-name.pipe';
import { TypedTitlePipe } from './pipes/typed-title.pipe';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { AlbumPersonsComponent } from './components/album-persons/album-persons.component';
import { AlbumPiecesComponent } from './components/album-pieces/album-pieces.component';
import { AlbumCuesheetsComponent } from './components/album-cuesheets/album-cuesheets.component';
import { DialogPicComponent } from './dialogs/dialog-pic/dialog-pic.component';
import { ChipListsComponent } from './components/chip-lists/chip-lists.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StorageService} from './services/storage.service';
import { AlbumMetatagsComponent } from './components/album-metatags/album-metatags.component';
import { DialogAddComponent } from './dialogs/dialog-add/dialog-add.component';
import { DialogPersonComponent } from './dialogs/dialog-person/dialog-person.component';
import { DialogTagComponent } from './dialogs/dialog-tag/dialog-tag.component';
import { DialogPiecesComponent } from './dialogs/dialog-pieces/dialog-pieces.component';
import {PieceService} from './services/piece.service';
import {PersonService} from './services/person.service';
import { CuesheetMenuComponent } from './components/cuesheet-menu/cuesheet-menu.component';
import { CodeComponent } from './components/code/code.component';
import { CodeListComponent } from './components/code-list/code-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { DialogCuesheetPartsComponent } from './dialogs/dialog-cuesheet-parts/dialog-cuesheet-parts.component';
import {UtilService} from './services/util.service';
import {CuesheetService} from './services/cuesheet.service';
import { DialogInputComponent } from './dialogs/dialog-input/dialog-input.component';
import { ComponistComponent } from './components/componist/componist.component';
import { ComponistListComponent } from './components/componist-list/componist-list.component';
import { PerformerListComponent } from './components/performer-list/performer-list.component';
import { PerformerComponent } from './components/performer/performer.component';
import { AlphabetComponent } from './components/alphabet/alphabet.component';
import { PersonsComponent } from './components/persons/persons.component';
import { StartletterPipe } from './pipes/startletter.pipe';
import { CollectieComponent } from './components/collectie/collectie.component';
import { CollectieListComponent } from './components/collectie-list/collectie-list.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagComponent } from './components/tag/tag.component';
import { CollectiesComponent } from './components/collecties/collecties.component';
import { TagsComponent } from './components/tags/tags.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { DialogCustomizeSearchComponent } from './dialogs/dialog-customize-search/dialog-customize-search.component';
import {ChoiceService} from './services/choice.service';
import { VisiblePipe } from './pipes/visible.pipe';
import { DialogInstrumentComponent } from './dialogs/dialog-instrument/dialog-instrument.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SearchComponent,
    WelcomeComponent,
    ToolsComponent,
    AlbumThumbComponent,
    TypedNamePipe,
    TypedTitlePipe,
    AlbumDetailsComponent,
    AlbumPersonsComponent,
    AlbumPiecesComponent,
    AlbumCuesheetsComponent,
    ChipListsComponent,
    ToolbarComponent,
    AlbumMetatagsComponent,
    DialogPicComponent,
    DialogAddComponent,
    DialogPersonComponent,
    DialogTagComponent,
    DialogPiecesComponent,
    DialogCuesheetPartsComponent,
    CuesheetMenuComponent,
    CodeComponent,
    CodeListComponent,
    SettingsComponent,
    SearchFormComponent,
    AlbumListComponent,
    DialogInputComponent,
    ComponistComponent,
    ComponistListComponent,
    PerformerListComponent,
    PerformerComponent,
    AlphabetComponent,
    PersonsComponent,
    StartletterPipe,
    CollectieComponent,
    CollectieListComponent,
    TagListComponent,
    TagComponent,
    CollectiesComponent,
    TagsComponent,
    TypeaheadComponent,
    DialogCustomizeSearchComponent,
    VisiblePipe,
    DialogInstrumentComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,  // needed for ngModel
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatChipsModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatListModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    DialogPicComponent,
    DialogAddComponent,
    DialogPersonComponent,
    DialogTagComponent,
    DialogCuesheetPartsComponent,
    DialogPiecesComponent,
    DialogInputComponent,
    DialogCustomizeSearchComponent,
    DialogInstrumentComponent,
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
    MatDialogModule,
    ChoiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
