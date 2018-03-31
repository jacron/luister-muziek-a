import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MusicService } from './music.service';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlbumComponent } from './album/album.component';
import { SearchComponent } from './search/search.component';
import {WelcomeComponent} from './welcome/welcome.component';
import { ToolsComponent } from './tools/tools.component';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatIconModule,
  MatSelectModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlbumThumbComponent } from './album-thumb/album-thumb.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { TypedNamePipe } from './typed-name.pipe';
import { TypedTitlePipe } from './typed-title.pipe';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumPersonsComponent } from './album-persons/album-persons.component';
import { AlbumPiecesComponent } from './album-pieces/album-pieces.component';
import { AlbumCuesheetsComponent } from './album-cuesheets/album-cuesheets.component';
import { DialogPicComponent } from './dialog-pic/dialog-pic.component';
import { ChipListsComponent } from './chip-lists/chip-lists.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AlbumComponent,
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
    DialogPicComponent,
    ChipListsComponent,
    ToolbarComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,  // needed for ngModel
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatChipsModule,
    MatToolbarModule,
    MatDialogModule,
    MatTooltipModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [
    DialogPicComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MusicService,
    TypedNamePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
