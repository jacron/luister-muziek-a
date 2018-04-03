import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MusicService} from '../music.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-person',
  templateUrl: './dialog-person.component.html',
  styleUrls: ['./dialog-person.component.scss']
})
export class DialogPersonComponent implements OnInit {

  imgUrl = environment.apiServer + '/image/';
  googleUrl = environment.googleUrl;
  personName: string;

  constructor(private musicService: MusicService,
              public dialogRef: MatDialogRef<DialogPersonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router
  ) { }

  afterUpdate(response, text) {
    console.log(response);
    this.data.person.FullName = text;
  }

  updatePerson(text, field) {
    this.musicService.updatePerson (
      {
        personId: this.data.person.ID,
        type: this.data.type,
        field: field,
        text: text
      })
      .subscribe(
      (response) => this.afterUpdate(response, text)
    );
  }

  nameKeydown(e, text) {
    if (e.key === 'Enter') {
      this.updatePerson(text, 'Name');
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updatePerson(text, 'Name');
    }
  }

  birthKeydown(e, text) {
    if (e.key === 'Enter') {
      this.updatePerson(text, 'Birth');
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updatePerson(text, 'Birth');
    }
  }

  deathKeydown(e, text) {
    if (e.key === 'Enter') {
      this.updatePerson(text, 'Death');
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updatePerson(text, 'Death');
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
    this.personName = this.data.person.FullName;
  }

}
