import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumDetailsComponent} from './components/album-details/album-details.component';
import {MatModule} from '../../mat/mat.module';
import {AlbumMenuComponent} from './components/album-menu/album-menu.component';
import {AlbumMetatagsComponent} from './components/album-metatags/album-metatags.component';
import {AlbumPiecesComponent} from './components/album-pieces/album-pieces.component';
import {DialogPiecesComponent} from './dialogs/dialog-pieces/dialog-pieces.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {DialogInputComponent} from './dialogs/dialog-input/dialog-input.component';
import {DialogPicComponent} from './dialogs/dialog-pic/dialog-pic.component';
import {DialogSettingsComponent} from './dialogs/dialog-settings/dialog-settings.component';
import {DialogAlbumComponent} from './dialogs/dialog-album/dialog-album.component';
import {CuesheetModule} from '../cuesheet/cuesheet.module';
import {ChipsModule} from '../chips/chips.module';
import { AlbumHeaderComponent } from './components/album-header/album-header.component';
import { DialogAliassingPartsComponent } from './dialogs/dialog-aliassing-parts/dialog-aliassing-parts.component';

@NgModule({
  declarations: [
    AlbumDetailsComponent,
    AlbumMenuComponent,
    AlbumMetatagsComponent,
    AlbumPiecesComponent,
    DialogPiecesComponent,
    DialogPicComponent,
    DialogInputComponent,
    DialogAlbumComponent,
    DialogSettingsComponent,
    AlbumHeaderComponent,
    DialogAliassingPartsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatModule,
    ChipsModule,
    CuesheetModule,
    ChipsModule,
    FormsModule,  // needed for ngModel
  ],
  exports: [
    AlbumDetailsComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  entryComponents: [
    DialogPiecesComponent,
    DialogPicComponent,
    DialogInputComponent,
    DialogAlbumComponent,
    DialogSettingsComponent,
    DialogAliassingPartsComponent,
  ]
})
export class AlbumModule { }
