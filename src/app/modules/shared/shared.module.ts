import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeaheadComponent} from './components/typeahead/typeahead.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatModule} from '../mat/mat.module';
import {DialogHeaderDirective} from './directives/dialog-header.directive';
import {DefaultImageDirective} from './directives/default-image.directive';
import { OptionsMenuComponent } from './components/options-menu/options-menu.component';
import { PersonsTableComponent } from './components/persons-table/persons-table.component';
import {ItemWikiComponent} from './components/item-wiki/item-wiki.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

@NgModule({
  declarations: [
    TypeaheadComponent,
    DialogHeaderDirective,
    DefaultImageDirective,
    OptionsMenuComponent,
    PersonsTableComponent,
    ItemWikiComponent,
    PersonFormComponent,
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
    OptionsMenuComponent,
    PersonsTableComponent,
    ItemWikiComponent,
    PersonFormComponent,
  ]
})
export class SharedModule { }
