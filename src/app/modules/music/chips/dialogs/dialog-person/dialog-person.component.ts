import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MusicService} from '../../../services/music.service';
import {environment} from '../../../../../../environments/environment';
import {Router} from '@angular/router';
import {Person} from '../../../../../classes/music/Person';
import {DialogPicComponent} from '../../../album/dialogs/dialog-pic/dialog-pic.component';

@Component({
  selector: 'app-dialog-person',
  templateUrl: './dialog-person.component.html',
  styleUrls: ['./dialog-person.component.scss']
})
export class DialogPersonComponent implements OnInit {

  imgUrl = environment.musicServer + '/image/';
  googleUrl = environment.googleUrl;
  person: Person;
  albumCount: number;
  model;

  constructor(
    private musicService: MusicService,
    public dialogRef: MatDialogRef<DialogPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private router: Router
  ) { }

  openPicDialog(imgUrl, person: Person) {
    this.dialog.open(DialogPicComponent, {
      width: '80%',
      data: {
        imgUrl: imgUrl,
        name: person.FullName
      }
    });
  }

  openPicPerson() {
    this.openPicDialog(this.imgUrl + this.data.person.ID + '/' +
      this.data.type, this.data.person);
  }

  afterUpdate(response, text, field) {
    console.log(response);
    this.data.person[field] = text;
  }

  updatePerson(text, field) {
    this.musicService.updatePersonField (
      {
        personId: this.data.person.ID,
        type: this.data.type,
        field: field,
        text: text
      })
      .subscribe(
      (response) => this.afterUpdate(response, text, field)
    );
  }

  fieldKeydown(e, text, field) {
    if (e.key === 'Enter') {
      this.updatePerson(text, field);
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      this.updatePerson(text, field);
    }
  }

  afterPaste(response) {
    console.log(response);
    // work-around for refreshing image (src)
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
      }
    ]).then(() => this.dialogRef.close('leave'));
  }

  paste() {
    this.musicService.pastePersonImage(this.data.person.ID, this.data.type)
      .subscribe((response) => this.afterPaste(response));
  }

  afterAlbumCount(response) {
    this.albumCount = response.count;
  }

  ngOnInit() {
    const dPerson = this.data.person;
    this.person = {
      ID: dPerson.ID,
      FullName: dPerson.FullName,
      Name: dPerson.FullName,
      Birth: dPerson.Birth,
      Death: dPerson.Death,
      Role: dPerson.Role
    };
    this.musicService.getAlbumCountForPerson(this.data.person.ID, this.data.type)
      .subscribe(
      (response) => this.afterAlbumCount(response)
    );
  }

}
