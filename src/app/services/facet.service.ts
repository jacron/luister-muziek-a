import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogCategoryComponent} from '../dialogs/dialog-category/dialog-category.component';

@Injectable({
  providedIn: 'root'
})
export class FacetService {

  constructor(
    private dialog: MatDialog,

  ) { }

  chooseCategory() {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
    });
    return dialogRef.afterClosed();
  }
}
