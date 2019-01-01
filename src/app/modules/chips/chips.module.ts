import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogTagComponent} from './dialogs/dialog-tag/dialog-tag.component';
import {DialogPersonComponent} from './dialogs/dialog-person/dialog-person.component';
import {DialogInstrumentComponent} from './dialogs/dialog-instrument/dialog-instrument.component';
import {MatModule} from '../../mat/mat.module';

@NgModule({
  declarations: [
    DialogPersonComponent,
    DialogTagComponent,
    DialogInstrumentComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
  ],
  entryComponents: [
    DialogPersonComponent,
    DialogTagComponent,
    DialogInstrumentComponent,
  ]
})
export class ChipsModule { }
