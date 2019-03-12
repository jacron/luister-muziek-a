import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MusicService } from './modules/music/services/music.service';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule} from './modules/app-routing/app-routing.module';
import { TypedNamePipe } from './pipes/typed-name.pipe';
import { TypedTitlePipe } from './pipes/typed-title.pipe';
import { StorageService} from './services/storage.service';
import {UtilService} from './services/util.service';
import { DialogCustomizeSearchComponent } from './dialogs/dialog-customize-search/dialog-customize-search.component';
import {ChoiceService} from './modules/music/services/choice.service';
import {MatModule} from './modules/mat/mat.module';
import {StateService} from './services/state.service';
import {SharedModule} from './modules/shared/shared.module';
import {PieceService} from './modules/music/album/services/piece.service';
import {MoviesModule} from './modules/movies/movies.module';
import {MovieRoutingModule} from './modules/movie-routing/movie-routing.module';
import {BooksModule} from './modules/books/books.module';
import {BookRoutingModule} from './modules/book-routing/book-routing.module';
import {MusicModule} from './modules/music/music.module';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,  // needed for ngModel
    HttpClientModule,
    AppRoutingModule,
    MovieRoutingModule,
    BookRoutingModule,
    MatModule,
    ReactiveFormsModule,
    MusicModule,
    MoviesModule,
    BooksModule,
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
    TypedNamePipe,
    TypedTitlePipe,
    StorageService,
    UtilService,
    ChoiceService,
    StateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
