import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogTagComponent} from './dialogs/dialog-tag/dialog-tag.component';
import {DialogPersonComponent} from './dialogs/dialog-person/dialog-person.component';
import {DialogInstrumentComponent} from './dialogs/dialog-instrument/dialog-instrument.component';
import {MatModule} from '../mat/mat.module';
import {DialogAddComponent} from './dialogs/dialog-add/dialog-add.component';
import {ChipListsComponent} from './components/chip-lists/chip-lists.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    DialogPersonComponent,
    DialogTagComponent,
    DialogInstrumentComponent,
    DialogAddComponent,
    ChipListsComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    SharedModule,
  ],
  exports: [
    ChipListsComponent,
  ],
  entryComponents: [
    DialogPersonComponent,
    DialogTagComponent,
    DialogInstrumentComponent,
    DialogAddComponent,
  ]
})
export class ChipsModule { }
