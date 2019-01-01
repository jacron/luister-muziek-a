import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumCuesheetsComponent} from './components/album-cuesheets/album-cuesheets.component';
import {CuesheetActionsComponent} from './components/cuesheet-actions/cuesheet-actions.component';
import {CuesheetPartsComponent} from './components/cuesheet-parts/cuesheet-parts.component';
import {MatModule} from '../../mat/mat.module';

@NgModule({
  declarations: [
    AlbumCuesheetsComponent,
    CuesheetPartsComponent,
    CuesheetActionsComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
  ],
  exports: [
    AlbumCuesheetsComponent,
  ],
})
export class CuesheetModule { }
