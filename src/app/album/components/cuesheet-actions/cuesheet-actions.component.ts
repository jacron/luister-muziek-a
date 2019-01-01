import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cuesheet} from '../../../classes/Cuesheet';
import {DialogInputComponent} from '../../../dialogs/dialog-input/dialog-input.component';
import {Album} from '../../../classes/Album';
import {MatDialog} from '@angular/material';
import {MusicService} from '../../../services/music.service';

@Component({
  selector: 'app-cuesheet-actions',
  templateUrl: './cuesheet-actions.component.html',
  styleUrls: ['./cuesheet-actions.component.scss']
})
export class CuesheetActionsComponent implements OnInit {
  @Input() cuesheet: Cuesheet;
  @Input() album: Album;
  @Output() titleChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private musicService: MusicService,
    private dialog: MatDialog,
  ) { }

  afterRenameTitle(title: string, id: number) {
    this.titleChange.emit({
      title: title,
      id: id
    });
  }

  rename() {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      width: '75%',
      data: {
        prompt: '',
        default: this.cuesheet.Title
      }
    });
    dialogRef.afterClosed().subscribe(
      title => {
        if (title && title.length > 0) {
          this.musicService.updateCuesheetTitle(this.cuesheet.ID, this.album.ID, title)
            .subscribe(
              () => this.afterRenameTitle(title, this.cuesheet.ID)
            );
        }
      }
    );
  }

  edit() {
    this.musicService.editCue(this.cuesheet.ID, this.album.ID).subscribe(
      () => {},
      (error) => console.error(error)
    );
  }

  afterDelete() {
    this.musicService.refetch(this.album.ID).subscribe(
      (album: Album) => this.album.cuesheets = album.cuesheets
    );
  }

  remove() {
    if (confirm('delete "' + this.cuesheet.Title + '"?')) {
      this.musicService.deleteCue(this.cuesheet.ID, this.album.ID)
        .subscribe(() => this.afterDelete()
        );
    }
  }

  ngOnInit() {
  }

}
