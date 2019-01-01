import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumDetailsComponent} from './components/album-details/album-details.component';
import {MatModule} from '../mat/mat.module';
import {AlbumMenuComponent} from './components/album-menu/album-menu.component';
import {ChipListsComponent} from './components/chip-lists/chip-lists.component';
import {AlbumMetatagsComponent} from './components/album-metatags/album-metatags.component';
import {AlbumCuesheetsComponent} from './components/album-cuesheets/album-cuesheets.component';
import {AlbumPersonsComponent} from './components/album-persons/album-persons.component';
import {AlbumPiecesComponent} from './components/album-pieces/album-pieces.component';
import {CuesheetPartsComponent} from './components/cuesheet-parts/cuesheet-parts.component';
import {CuesheetActionsComponent} from './components/cuesheet-actions/cuesheet-actions.component';
import {DialogPiecesComponent} from './dialogs/dialog-pieces/dialog-pieces.component';
import {FormsModule} from '@angular/forms';
import {DialogAddComponent} from './dialogs/dialog-add/dialog-add.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AlbumDetailsComponent,
    AlbumMenuComponent,
    ChipListsComponent,
    AlbumMetatagsComponent,
    AlbumCuesheetsComponent,
    AlbumPersonsComponent,
    AlbumPiecesComponent,
    CuesheetPartsComponent,
    CuesheetActionsComponent,
    DialogPiecesComponent,
    DialogAddComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,  // needed for ngModel
    MatModule,
  ],
  exports: [
    AlbumDetailsComponent
  ],
  entryComponents: [
    DialogPiecesComponent,
    DialogAddComponent,
  ]
})
export class AlbumModule { }
