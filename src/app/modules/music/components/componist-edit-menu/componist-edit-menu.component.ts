import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Componist} from '../../../../classes/music/Componist';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {ToastrService} from 'ngx-toastr';
import {InternetService} from '../../../../services/internet.service';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-componist-edit-menu',
  templateUrl: './componist-edit-menu.component.html',
  styleUrls: ['./componist-edit-menu.component.scss']
})
export class ComponistEditMenuComponent implements OnInit {
  @Input() composer: Componist;
  @Output() composerChange = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() wiki = new EventEmitter();

  ncomposer: Componist;

  options: MenuOption[] = [
    {
      label: 'Google',
      icon: 'search',
      color: 'violet',
      action: this.google.bind(this)
    },
    {
      label: 'Plak afbeelding in',
      icon: 'brush',
      color: 'green',
      action: this.pasteClipboardImage.bind(this)
    },
  ];

  constructor(
    private toastr: ToastrService,
    private internet: InternetService,
    private musicService: MusicService,
  ) { }

  act(f: Function) {
    f();
  }

  google() {
    this.internet.openGoogle(this.ncomposer.fullName());
  }

  afterPastePicture(response) {
    console.log(response);
    const {status} = response;
    this.composerChange.emit(this.composer);
    if (status === 200) {
      this.toastr.success('afbeelding van url gedownload', 'cover');
    } else {
      this.toastr.error('regisseur pad niet gevonden', 'cover');
    }
  }

  pasteClipboardImage() {
    console.log('paste clipboard');
    this.musicService.pasteComposerImage(this.composer.ID).subscribe(
      result => this.afterPastePicture(result)
    )
  }

  ngOnInit() {
    this.ncomposer = new Componist(this.composer);
  }

}
