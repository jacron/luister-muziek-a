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
import {MatAutocompleteModule, MatButtonModule, MatIconModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlbumThumbComponent } from './album-thumb/album-thumb.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { TypedNamePipe } from './typed-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AlbumComponent,
    SearchComponent,
    WelcomeComponent,
    ToolsComponent,
    AlbumThumbComponent,
    TypedNamePipe
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
    HttpClientModule,
    AppRoutingModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MusicService,
    TypedNamePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
