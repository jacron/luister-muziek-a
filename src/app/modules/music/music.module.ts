import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from './components/search/search.component';
import {ToolsComponent} from '../../tools/tools.component';
import {TypedNamePipe} from '../../pipes/typed-name.pipe';
import {TypedTitlePipe} from '../../pipes/typed-title.pipe';
import {CodeComponent} from './components/code/code.component';
import {CodeListComponent} from './components/code-list/code-list.component';
import {SettingsComponent} from '../../components/settings/settings.component';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {AlbumListComponent} from './components/album-list/album-list.component';
import {ComponistComponent} from './components/componist/componist.component';
import {PerformerComponent} from './components/performer/performer.component';
import {AlphabetComponent} from './components/alphabet/alphabet.component';
import {PersonsComponent} from './components/persons/persons.component';
import {StartletterPipe} from '../../pipes/startletter.pipe';
import {CollectieComponent} from './components/collectie/collectie.component';
import {TagListComponent} from './components/tag-list/tag-list.component';
import {TagComponent} from './components/tag/tag.component';
import {CollectiesComponent} from './components/collecties/collecties.component';
import {TagsComponent} from './components/tags/tags.component';
import {DialogCustomizeSearchComponent} from '../../dialogs/dialog-customize-search/dialog-customize-search.component';
import {VisiblePipe} from '../../pipes/visible.pipe';
import {RecentComponent} from './components/recent/recent.component';
import {PopComponent} from './components/pop/pop.component';
import {PopListComponent} from './components/pop-list/pop-list.component';
import {HomeComponent} from './components/home/home.component';
import {SimpleChipListsComponent} from './components/simple-chip-lists/simple-chip-lists.component';
import {MenuMusicComponent} from '../menu/menu-music/menu-music.component';
import {MenuMoviesComponent} from '../menu/menu-movies/menu-movies.component';
import {MenuVideosComponent} from '../menu/menu-videos/menu-videos.component';
import {VideosKlassiekComponent} from './components/videos-klassiek/videos-klassiek.component';
import {VideosPopComponent} from './components/videos-pop/videos-pop.component';
import {SubmenuComponent} from '../menu/submenu/submenu.component';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';
import {VideoDocumentaireComponent} from './components/video-documentaire/video-documentaire.component';
import {MenuBooksComponent} from '../menu/menu-books/menu-books.component';
import {MatModule} from '../mat/mat.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing/app-routing.module';
import {MusicService} from './services/music.service';
import {PieceService} from './album/services/piece.service';
import {StorageService} from '../../services/storage.service';
import {UtilService} from '../../services/util.service';
import {ChoiceService} from './services/choice.service';
import {StateService} from '../../services/state.service';
import {AlbumModule} from './album/album.module';
import {ChipsModule} from './chips/chips.module';
import { ComponistEditCardComponent } from './components/componist-edit-card/componist-edit-card.component';
import { ComponistEditMenuComponent } from './components/componist-edit-menu/componist-edit-menu.component';
import { DialogComponistComponent } from './dialogs/dialog-componist/dialog-componist.component';
import { ComponistWikiComponent } from './components/componist-wiki/componist-wiki.component';
import { ComponistListComponent } from './components/componist-list/componist-list.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';
import { AlbumsComponent } from './components/albums/albums.component';

@NgModule({
  declarations: [
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
    MenuMusicComponent,
    MenuMoviesComponent,
    MenuVideosComponent,
    VideosKlassiekComponent,
    VideosPopComponent,
    SubmenuComponent,
    ToolbarComponent,
    VideoDocumentaireComponent,
    MenuBooksComponent,
    ComponistEditCardComponent,
    ComponistEditMenuComponent,
    DialogComponistComponent,
    ComponistWikiComponent,
    ComponistListComponent,
    CollectionDetailsComponent,
    AlbumsComponent,

  ],
  imports: [
    CommonModule,
    AlbumModule,
    ChipsModule,
    MatModule,
    ReactiveFormsModule,
    FormsModule,  // needed for ngModel
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    ToolsComponent,
    HomeComponent,
    MenuMusicComponent,
    MenuMoviesComponent,
    MenuVideosComponent,
    SubmenuComponent,
    ToolbarComponent,
    MenuBooksComponent,
  ],
  providers: [
    MusicService,
    PieceService,
    TypedNamePipe,
    TypedTitlePipe,
    StorageService,
    UtilService,
    ChoiceService,
    StateService
  ],
  entryComponents: [
    DialogComponistComponent
  ],
})
export class MusicModule { }
