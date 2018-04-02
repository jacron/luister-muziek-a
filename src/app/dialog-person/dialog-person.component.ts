import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MusicService} from '../music.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {ChipListsComponent} from '../chip-lists/chip-lists.component';

@Component({
  selector: 'app-dialog-person',
  templateUrl: './dialog-person.component.html',
  styleUrls: ['./dialog-person.component.scss']
})
export class DialogPersonComponent implements OnInit {

  imgUrl = environment.apiServer + '/image/';
  googleUrl = environment.googleUrl;

  constructor(private musicService: MusicService,
              public dialogRef: MatDialogRef<ChipListsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router
  ) { }

  updatePerson(id, text, field) {
    this.musicService.updatePerson(id, this.data.albumid, this.data.type, text,
      field).subscribe(
      (response) => console.log(response)
    );
  }

  nameKeydown(e, id, type, text) {
    if (e.key === 'Enter') {
      this.updatePerson(id, text, 'Name');
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updatePerson(id, text, 'Name');
    }
  }

  birthKeydown(e, id, type, text) {
    if (e.key === 'Enter') {
      this.updatePerson(id, text, 'Birth');
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updatePerson(id, text, 'Birth');
    }
  }

  deathKeydown(e, id, type, text) {
    if (e.key === 'Enter') {
      this.updatePerson(id, text, 'Death');
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updatePerson(id, text, 'Death');
    }
  }

  afterPaste(response) {
    console.log(response);
    const saved = this.data.type;
    this.data.type = 'dummy';
    setTimeout(() => {
      this.data.type = saved;
    }, 0);
  }

  toSearch() {
    let
      idcomp = -1,
      idperf = -1;
    if (this.data.type === 'componist') {
      idcomp = this.data.person.ID;
    } else if (this.data.type === 'performer') {
      idperf = this.data.person.ID;
    }
    this.router.navigate(['/search',
      {
        idcomp: idcomp,
        idperf: idperf,
        idcoll: -1,
        idtag: -1
      }
    ]).then(() => this.dialogRef.close('leave'));
  }

  paste() {
    this.musicService.pastePersonImage(this.data.person.ID, this.data.type)
      .subscribe((response) => this.afterPaste(response));
  }

  ngOnInit() {
  }

}
