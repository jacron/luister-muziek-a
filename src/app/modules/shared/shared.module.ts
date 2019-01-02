import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeaheadComponent} from './components/typeahead/typeahead.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatModule} from '../mat/mat.module';
import {DialogHeaderDirective} from './directives/dialog-header.directive';

@NgModule({
  declarations: [
    TypeaheadComponent,
    DialogHeaderDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,  // needed for ngModel
    ReactiveFormsModule,
    MatModule,
  ],
  exports: [
    TypeaheadComponent,
    DialogHeaderDirective
  ]
})
export class SharedModule { }
