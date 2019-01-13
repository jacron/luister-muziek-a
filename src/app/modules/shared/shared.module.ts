import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeaheadComponent} from './components/typeahead/typeahead.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatModule} from '../mat/mat.module';
import {DialogHeaderDirective} from './directives/dialog-header.directive';
import {DefaultImageDirective} from './directives/default-image.directive';

@NgModule({
  declarations: [
    TypeaheadComponent,
    DialogHeaderDirective,
    DefaultImageDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,  // needed for ngModel
    ReactiveFormsModule,
    MatModule,
  ],
  exports: [
    TypeaheadComponent,
    DialogHeaderDirective,
    DefaultImageDirective,
  ]
})
export class SharedModule { }
