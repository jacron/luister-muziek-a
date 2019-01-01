import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AlbumMenuComponent} from '../../components/album-menu/album-menu.component';
import {SettingsService} from '../../../../services/settings.service';

const keyCoverSize = 'mzkCoversize';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {
  coverSize: number;

  constructor(
    private dialogRef: MatDialogRef<AlbumMenuComponent>,
    private settingsService: SettingsService,
  ) { }

  submit() {
    this.settingsService.setCoverSize(this.coverSize);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.coverSize = +this.settingsService.getCoverSize(300);
  }

}
