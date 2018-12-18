import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MusicService } from './services/music.service';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
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
import { ComponistComponent } from './componist/componist.component';
import { PerformerComponent } from './performer/performer.component';

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
    CuesheetMenuComponent,
    CodeComponent,
    CodeListComponent,
    SettingsComponent,
    ComponistComponent,
    PerformerComponent,

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
    AppRoutingModule
  ],
  entryComponents: [
    DialogPicComponent,
    DialogAddComponent,
    DialogPersonComponent,
    DialogTagComponent,
    DialogPiecesComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MusicService,
    PieceService,
    PersonService,
    TypedNamePipe,
    TypedTitlePipe,
    StorageService,
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
