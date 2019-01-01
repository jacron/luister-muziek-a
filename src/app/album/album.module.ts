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
  ],
  imports: [
    CommonModule,
    MatModule,
  ],
  exports: [
    AlbumDetailsComponent
  ]
})
export class AlbumModule { }
