import { Injectable } from '@angular/core';
import {DialogSettingsComponent} from '../../../dialogs/dialog-settings/dialog-settings.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuOptionsService {
  private menuOpties = {
    label: 'Opties',
    action: this.options.bind(this),
    icon: 'settings',
    color: '',
  };

  constructor(
    private dialog: MatDialog,

  ) { }

  menu() {
    return this.menuOpties;
  }

  private options() {
    this.dialog.open(DialogSettingsComponent);
  }


}
