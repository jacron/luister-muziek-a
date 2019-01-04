import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumCuesheetsComponent} from './components/album-cuesheets/album-cuesheets.component';
import {CuesheetActionsComponent} from './components/cuesheet-actions/cuesheet-actions.component';
import {CuesheetPartsComponent} from './components/cuesheet-parts/cuesheet-parts.component';
import {MatModule} from '../mat/mat.module';
import { AlbumAllCuesheetsComponent } from './components/album-all-cuesheets/album-all-cuesheets.component';
import { CuesheetMenuComponent } from './components/cuesheet-menu/cuesheet-menu.component';

@NgModule({
  declarations: [
    AlbumCuesheetsComponent,
    CuesheetPartsComponent,
    CuesheetActionsComponent,
    AlbumAllCuesheetsComponent,
    CuesheetMenuComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
  ],
  exports: [
    // AlbumCuesheetsComponent,
    AlbumAllCuesheetsComponent,
  ],
})
export class CuesheetModule { }
