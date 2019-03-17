import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {ToastrService} from 'ngx-toastr';
import {Director} from '../../../../classes/movies/Director';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-director-edit-menu',
  templateUrl: './director-edit-menu.component.html',
  styleUrls: ['./director-edit-menu.component.scss']
})
export class DirectorEditMenuComponent implements OnInit {
  @Input() director: Director;
  @Output() directorChange = new EventEmitter();
  @Output() toggle = new EventEmitter();
  @Output() wiki = new EventEmitter();
  @Output() close = new EventEmitter();

  options: MenuOption[] = [
    {
      label: 'Google',
      icon: 'search',
      color: 'violet',
      action: this.google.bind(this)
    },
    {
      label: 'Download afbeelding van pad',
      icon: 'brush',
      color: 'green',
      action: this.pastePicture.bind(this)
    },
    {
      label: 'Plak afbeelding in',
      icon: 'brush',
      color: 'green',
      action: this.pasteClipboardImage.bind(this)
    },
    {
      label: 'Films',
      icon: 'movie',
      action: this.showFilms.bind(this)
    },
    {
      label: 'divider',
      icon: ''
    },
    {
      label: 'Wiki nl',
      icon: 'info',
      color: '#5ff',
      action: this.wikipedia.bind(this, 'nl')
    },
    {
      label: 'Wiki de',
      icon: 'info',
      color: '#aaa',
      action: this.wikipedia.bind(this, 'de')
    },
    {
      label: 'Wiki en',
      icon: 'info',
      color: '#f55',
      action: this.wikipedia.bind(this, 'en')
    },
    {
      label: 'Wiki fr',
      icon: 'info',
      color: '#3cf',
      action: this.wikipedia.bind(this, 'fr')
    },
    {
      label: 'divider',
      icon: ''
    },
    {
      label: 'Verwijderen',
      icon: 'clear',
      color: 'red',
      action: this.remove.bind(this)
    },
  ];

  constructor(
    private moviesService: MoviesService,
    private toastr: ToastrService,
  ) { }

  act(f: Function) {
    f();
  }

  wikipedia(lng) {
    this.wiki.emit(lng);
  }

  afterPastePicture(response) {
    console.log(response);
    this.directorChange.emit(this.director);
    this.toastr.success('url afbeelding ingeplakt', 'cover');
  }

  pastePicture() {
    const {id, ImageUrl} = this.director;
    if (ImageUrl && ImageUrl.length) {
      this.moviesService.pasteDirectorPicture(id, ImageUrl).subscribe(
        response => this.afterPastePicture(response),
        err => console.log(err)
      )
    } else {
      this.toastr.error('Er is geen afbeeldingpad ingevuld');
    }
  }

  pasteClipboardImage() {
    console.log('paste clipboard');
    this.moviesService.pasteDirectorClipboardImage(this.director.id).subscribe(
      result => this.afterPastePicture(result)
    )
  }

  google() {
    window.open(environment.googleUrl +
      this.director.Voornaam + ' ' + this.director.Achternaam);
  }

  showFilms() {
    this.toggle.emit();
  }

  afterRemove(id) {
    console.log(id);
    this.close.emit('removed');
  }

  remove() {
    if (confirm('Regisseur verwijderen?')) {
      this.moviesService.removeDirector(this.director.id).subscribe(
        response => this.afterRemove(response)
      )
    }
  }

  ngOnInit() {
  }

}
