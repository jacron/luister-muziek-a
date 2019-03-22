import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Director} from '../../../../classes/movies/Director';
import {FormGroup, Validators} from '@angular/forms';
import {FormOption} from '../../../../classes/shared/FormOption';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {environment} from '../../../../../environments/environment';
import {FormEditService} from '../../../../services/form-edit.service';
import {FormError} from '../../../../classes/shared/FormError';

const formErrors: FormError[] = [
  {
    name: 'Achternaam',
    validator: 'required',
    message: 'Achternaam is verplicht'
  },
  {
    name: 'Geboortejaar',
    validator: 'jaartal',
    message: 'Een jaartal mag uit twee of vier cijfers bestaan'
  },
  {
    name: 'Sterfjaar',
    validator: 'jaartal',
    message: 'Een jaartal mag uit twee of vier cijfers bestaan'
  },
];

@Component({
  selector: 'app-director-edit-card',
  templateUrl: './director-edit-card.component.html',
  styleUrls: ['./director-edit-card.component.scss']
})
export class DirectorEditCardComponent implements OnInit, OnChanges {
  @Input() director: Director;
  @Input() refresh: string;
  @Output() close = new EventEmitter();
  @Output() directorChange = new EventEmitter();
  @Output() toggleFilmsList = new EventEmitter();
  @Output() wiki = new EventEmitter();
  formGroup: FormGroup;
  errors: FormError[];
  viewUrl = environment.moviesServer + '/image/director/';
  options: FormOption[] = [
    {
      name: 'Voornaam',
      label: 'Voornaam',
    },
    {
      name: 'Achternaam',
      validators: [Validators.required],
      label: 'Achternaam',
    },
    {
      name: 'Geboortejaar',
      validators: [this.formEditService.jaartalValidator()],
      label: 'Geboren',
      autocomplete: 'off'
    },
    {
      name: 'Sterfjaar',
      validators: [this.formEditService.jaartalValidator()],
      label: 'Overleden',
      autocomplete: 'off'
    },
    {
      name: 'imdb_id',
      label: 'imdb_id',
    },
    {
      name: 'ImageUrl',
      label: 'Afbeelding'
    },
    {
      name: 'Land',
      label: 'Land'
    }
  ];


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private moviesService: MoviesService,
    private formEditService: FormEditService,
  ) { }

  toDirector() {
    this.router.navigate(['director', this.director.id]).then(
      () => this.onClose('navigated')
    );
  }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  onClose(e) {
    this.close.emit(e);
  }

  toggle() {
    this.toggleFilmsList.emit();
  }

  closeDialog() {
    this.close.emit('canceled');
  }

  afterSave(id, director: Director) {
    this.director = director;
    this.toastr.success('opgeslagen!', this.director.Voornaam + ' ' +
      this.director.Achternaam);
    this.directorChange.emit(director);
    this.close.emit('saved');
  }

  save() {
    const current: Director = this.formGroup.value;
    const Land = this.formEditService.fromShortCountry(current.Land);
    const {born, died} = this.formEditService.fromBornDied(
      current.Geboortejaar, current.Sterfjaar);
    const director: Director = {
      ...current,
      Land,
      Geboortejaar: born,
      Sterfjaar: died,
      id: this.director.id,
    };
    this.moviesService.saveDirector(director).subscribe(
      response => this.afterSave(response, director)
    )
  }

  initForm() {
    this.errors = formErrors;
    this.formGroup = this.formEditService.initForm(
      this.options, this.director);
  }

  changeDirector() {
    this.refresh = '?now=' + new Date();
  }

  changeWiki(lng) {
    this.wiki.emit(lng);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // wiki component may have changed image url and years
    if (changes.director && this.formGroup) {
      const value: Director = changes.director.currentValue;
      this.formGroup.controls['ImageUrl'].setValue(value.ImageUrl);
      this.formGroup.controls['Geboortejaar'].setValue(value.Geboortejaar);
      this.formGroup.controls['Sterfjaar'].setValue(value.Sterfjaar);
    }
  }

  ngOnInit() {
    this.initForm();
  }

}
