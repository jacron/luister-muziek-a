import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumDetailsComponent} from './components/album-details/album-details.component';
import {MatModule} from '../../mat/mat.module';
import {AlbumMenuComponent} from './components/album-menu/album-menu.component';
// import {ChipListsComponent} from '../../chips/components/chip-lists/chip-lists.component';
import {AlbumMetatagsComponent} from './components/album-metatags/album-metatags.component';
import {AlbumPiecesComponent} from './components/album-pieces/album-pieces.component';
import {DialogPiecesComponent} from './dialogs/dialog-pieces/dialog-pieces.component';
import {FormsModule} from '@angular/forms';
import {DialogAddComponent} from './dialogs/dialog-add/dialog-add.component';
import {SharedModule} from '../../shared/shared.module';
import {DialogInputComponent} from './dialogs/dialog-input/dialog-input.component';
import {DialogPicComponent} from './dialogs/dialog-pic/dialog-pic.component';
import {DialogSettingsComponent} from './dialogs/dialog-settings/dialog-settings.component';
import {DialogAlbumComponent} from './dialogs/dialog-album/dialog-album.component';
import {CuesheetModule} from '../cuesheet/cuesheet.module';
import {ChipListsComponent} from '../chips/components/chip-lists/chip-lists.component';
import {ChipsModule} from '../chips/chips.module';

@NgModule({
  declarations: [
    AlbumDetailsComponent,
    AlbumMenuComponent,
    ChipListsComponent,
    AlbumMetatagsComponent,
    AlbumPiecesComponent,
    DialogPiecesComponent,
    DialogAddComponent,
    DialogPicComponent,
    DialogInputComponent,
    DialogAlbumComponent,
    DialogSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatModule,
    ChipsModule,
    CuesheetModule,
    FormsModule,  // needed for ngModel
  ],
  exports: [
    AlbumDetailsComponent
  ],
  entryComponents: [
    DialogPiecesComponent,
    DialogAddComponent,
    DialogPicComponent,
    DialogInputComponent,
    DialogAlbumComponent,
    DialogSettingsComponent,
  ]
})
export class AlbumModule { }
