import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeaheadComponent} from './components/typeahead/typeahead.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatModule} from '../mat/mat.module';

@NgModule({
  declarations: [
    TypeaheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  // needed for ngModel
    ReactiveFormsModule,
    MatModule,
  ],
  exports: [
    TypeaheadComponent,
  ]
})
export class SharedModule { }
