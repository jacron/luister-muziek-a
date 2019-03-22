import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {ToastrService} from 'ngx-toastr';
import {Director} from '../../../../classes/movies/Director';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {InternetService} from '../../../../services/internet.service';

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

  ndirector: Director;

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
      label: 'Haal afbeelding van IMDb',
      icon: 'person',
      action: this.getPicture.bind(this),
    },
    {
      label: 'Films',
      icon: 'movie',
      action: this.showFilms.bind(this)
    },
    {
      label: 'IMDb',
      icon: 'movie',
      color: 'gold',
      action: this.toImdb.bind(this)
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
    private internet: InternetService,
  ) { }

  act(f: Function) {
    f();
  }

  afterPastePicture(response) {
    console.log(response);
    const {status} = response;
    this.directorChange.emit(this.director);
    if (status === 200) {
      this.toastr.success('afbeelding van url gedownload', 'cover');
    } else {
      this.toastr.error('regisseur pad niet gevonden', 'cover');
    }
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

  afterGetPicture(result) {
    console.log(result);
    if (!result) {
      this.toastr.error('geen IMDb afbeelding gevonden');
      return;
    }
    const director: Director = {
      ...this.director,
      ImageUrl: result
    };
    // this.director.ImageUrl = result;
    this.directorChange.emit(director);
    this.toastr.success('IMDb afbeelding opgehaald', 'cover');
  }

  getPicture() {
    this.moviesService.getDirectorPicture(this.director.imdb_id).subscribe(
      result => this.afterGetPicture(result)
    )
  }

  google() {
    this.internet.openGoogle(this.director.fullName());
  }

  showFilms() {
    this.toggle.emit();
  }

  toImdb() {
    this.internet.openImdbName(this.director.imdb_id);
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
    this.ndirector = new Director(this.director);
  }

}
